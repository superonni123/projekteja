#html parser
from bs4 import BeautifulSoup
#getting html page
import requests
from urllib.request import urlretrieve

#for getting time
import time

#for file operations
import os
import subprocess
import shutil

path = os.path.dirname(os.path.realpath(__file__))
file_name = ""
arg = ""
url = ""
filelist = []

#tricking 
headers = {'user-agent':'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/116.0'}

#formats the time to day, month, year
date = time.strftime("%Y-%m-%d")
print(date)

url = str(input("thread url: "))

print(url)
#get the html page
response = requests.get(url,headers=headers,timeout=2)
#if the response is not OK
if response.status_code != 200:
	print("Error fetching page")
	exit()
else:
	#the page
	content = response.content
	print("successfully the downloaded thread")

#parse the page
soup = BeautifulSoup(response.content, 'html.parser')
#make it pretty
soup.prettify()
print("html parsed")


#opens file where the links will be stored
f = open(path+"/"+date+"_links.txt", "w")

#loops every article
for link in soup.find_all("a", class_="fileThumb"):
	#extracts the file url
	soppa = (link.get("href"))
	#writes it to the file
	f.write(soppa[2:len(soppa)]+"\n")
#closes the file
f.close()
print("links extracted")

#if the directory does not exist
if not os.path.isdir(path+"/days/"+date):
	#make a new directory
	os.mkdir(path+"/days/"+date)
	print("directory made")

#move the file to the directory
shutil.move(path+"/"+date+"_links.txt", path+"/days/"+date+"/"+date+"_links.txt")
print("link list moved to the directory")

print("calling wget to download the images")
subprocess.call([path+"/wget.sh", date, path])
