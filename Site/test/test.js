const assert = require('assert');
const firebase = require('@firebase/testing');

const MY_PROJECT_ID = "webchat-f8f06";
const myUserId = "user_abc";
const otherUserId = "user_xyz";
const myAuth = {uid: myUserId, email: "abc@gmail.com"};
const otherAuth = {uid: otherUserId, email: "xyz@gmail.com"}

function getFirestore(auth){
    return firebase.initializeTestApp({projectId: MY_PROJECT_ID, auth: auth}).firestore();
}

beforeEach(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
})

describe("Web Chat App", () => {

    it("Basic math", () => {
        assert.equal(1+1, 2);
    });

    it("Basic math 2", () => {
        assert.equal(1*1, 1);
    });

    /*it("Can read items in the read-only collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    });

    it("Can't write to items in the read-only collection", async() => {
        const db = getFirestore(null);
        const testDoc = db.collection("readonly").doc("testDoc2");
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    });

    it("Can write to a user document with the same ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc("user_abc");
        await firebase.assertSucceeds(testDoc.set({foo: "bar"}));
    });

    it("Can't write to a user document with a different ID as our user", async() => {
        const db = getFirestore(myAuth);
        const testDoc = db.collection("users").doc(otherUserId);
        await firebase.assertFails(testDoc.set({foo: "bar"}));
    });

    it("Can read posts marked public", async() => {
        const db = getFirestore(null);
        const testQuery = db.collection("posts").where("visibility", "==", "public");
        await firebase.assertSucceeds(testQuery.get());
    });

    it("Can't read posts marked private", async() => {
        const db = getFirestore(null);
        const testQuery = db.collection("posts").where("visibility", "==", "private");
        await firebase.assertFails(testQuery.get());
    });

    it("Can query personal posts", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts").where("authorId", "==", myUserId);
        await firebase.assertSucceeds(testQuery.get());
    });

    it("Can't query all posts", async() => {
        const db = getFirestore(myAuth);
        const testQuery = db.collection("posts");
        await firebase.assertFails(testQuery.get());
    });

    it("Can read a single public post", async() => {
        const dbCreate = getFirestore(otherAuth);
        const postId = "public_post";
        const setupDoc = dbCreate.collection("posts").doc(postId);
        await setupDoc.set({authorId: otherUserId, visibility: "public"});
        
        const db = getFirestore(null);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    });

    it("Can read a private post belonging to the user", async() => {
        const dbCreate = getFirestore(myAuth);
        const postId = "my_private_post";
        const setupDoc = dbCreate.collection("posts").doc(postId);
        await setupDoc.set({authorId: myUserId, visibility: "private"});
        
        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertSucceeds(testRead.get());
    });

    it("Can't read a private post belonging to another user", async() => {
        const dbCreate = getFirestore(otherAuth);
        const postId = "other_private_post";
        const setupDoc = dbCreate.collection("posts").doc(postId);
        await setupDoc.set({authorId: otherUserId, visibility: "private"});
        
        const db = getFirestore(myAuth);
        const testRead = db.collection("posts").doc(postId);
        await firebase.assertFails(testRead.get());
    });*/
})

after(async() => {
    await firebase.clearFirestoreData({projectId: MY_PROJECT_ID});
})