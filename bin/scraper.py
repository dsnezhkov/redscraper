from pyvirtualdisplay import Display
from selenium import webdriver
import io, json, os

config={}
config_file="./config/default.json"


def scrape(browser, onweb, ondisk):
   print("Fetch %s => %s" % (onweb, ondisk) )
   #browser.get('https://dowbenefits.ehr.com/ESS/home/Login.aspx')
   #browser.get('https://dowbenefits.ehr.com/ESS/Client/Home/DowChemSetPassword.aspx')
   
   #character_encoding="utf-8"
   #with io.open(ondisk, 'w', encoding=character_encoding) as ofile:
   #   ofile.write(browser.page_source)

def drive():

   display = Display(visible=0, size=(800, 600))
   display.start()
   browser = webdriver.Firefox()

   for item in config['site']['scraper']['urls']:
      scrape(browser, item['url'],item['filename'])

   browser.quit()
   display.stop()

if __name__ == "__main__":
   firefox_path="/opt/firefox/firefox"
   os.environ["PATH"] += os.pathsep + firefox_path
   with open(config_file) as config_file:
      config = json.load(config_file)
   drive()

