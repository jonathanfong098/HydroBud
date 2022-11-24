import { doc, collection, query, deleteDoc} from "firebase/firestore"
import { firebaseDB } from "./firebase-config"

const GET_DEVICES_QUERY = query(collection(firebaseDB, 'devices'))

const deleteDevice = async (deviceID) => {
    try {
        console.log("Deleting Device")
        await deleteDoc(doc(firebaseDB, 'devices', deviceID));
    } catch (error) {
        throw error
    }
}

export { GET_DEVICES_QUERY, deleteDevice}
