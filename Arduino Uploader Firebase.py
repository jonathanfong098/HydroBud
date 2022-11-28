import serial
import time
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('firebase.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()


#
# make sure the 'COM#' is set according the Windows Device Manager
ser = serial.Serial('COM3', 115200, timeout=1)
time.sleep(2)

for i in range(5):
    e = datetime.datetime.now()
    line = ser.readline()   # read a byte string
    if line:
        raw = line.decode()  # convert the byte string to a unicode string
        data = raw.split(",")
        #d.append({"id":deviceID,"time":int(time.time()),"ppm":int(data[0]),"temp":float(data[1]),"level":data[2][0]})
        toUpload = {
            u'ppm': int(data[0]),
            u'temp': float(data[1]),
            u'level': data[2][0],
            u'deviceID': u'5rvgs9BisKUvNPkarzez',
            u'timestamp': firestore.SERVER_TIMESTAMP
            }
        print("ppm",int(data[0]))
        print("temp",float(data[1]))
        print("level",data[2][0])
        db.collection(u'device_data').document().set(toUpload)
ser.close()
