import { collection, addDoc, getDocs, query, orderBy, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export const addComment = async (commentText) => {
  if (!commentText || commentText.trim() === '') {
  }

  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      text: commentText.trim(),
      timestamp: Timestamp.now(),
      userId: auth.currentUser.uid,
      username: auth.currentUser.displayName
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding comment: ', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    throw error;
  }
};

export const loadComments = async () => {
  try {
    const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const commentsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate()
    }));
    return commentsList;
  } catch (error) {
    console.error('Error loading comments: ', error);
    throw error;
  }
};

const commentService = {
  addComment,
  loadComments,
  deleteComment
};

export default commentService;