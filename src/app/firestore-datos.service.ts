import { Injectable } from '@angular/core';
import { ref } from '@angular/fire/database';
import { Firestore,collection, addDoc, collectionData, doc, deleteDoc,updateDoc, docData, documentId, docSnapshots } from '@angular/fire/firestore';
import { CollectionReference, DocumentReference, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatosService {

  constructor(private firestore:Firestore) {

   }

   createDoc(data: any, path: string, id: string) {
    // const collection = this.firestore.collection(path);
    // const usuarioRef = collection(this.firestore, path);
    // const usuarioRef = collection(this.firestore, path);
    // return addDoc(usuarioRef,data);
    const usuarioRef = collection(this.firestore, path);
    const docrRef = doc(usuarioRef.firestore, `${path}/${id}`)
    return setDoc(docrRef, data);
   }
   findObject(id: string = '', path: string){
    // const recPerson=doc(this.firestore,`${path}/${id}`);
    const recPerson=doc(this.firestore,`Usuarios/${id}`);
    return getDoc(recPerson);
  }

}
