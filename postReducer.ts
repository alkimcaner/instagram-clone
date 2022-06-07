import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { IPost } from "./pages";

export interface IPostReducer {
  post: IPost;
  isCommentsVisible: boolean;
}

export const postReducer = (state: IPostReducer, action: any): IPostReducer => {
  const postRef = doc(db, "posts", state.post.id);

  switch (action.type) {
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "SET_COMMENTS":
      updateDoc(doc(db, "posts", state.post.id), {
        comments: action.payload,
      });

      return {
        ...state,
        post: { ...state.post, comments: action.payload },
      };
    case "DELETE_COMMENT":
      updateDoc(postRef, {
        comments: state.post.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      });

      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment.id !== action.payload
          ),
        },
      };
    case "TOGGLE_LIKE":
      const likes = state.post.likes.filter(
        (like) => like !== action.payload?.user?.email
      );

      if (likes.length === state.post.likes.length) {
        likes.push(action.payload?.user?.email || "");
      }
      updateDoc(postRef, { likes });

      return {
        ...state,
        post: { ...state.post, likes },
      };
    case "SET_COMMENTS_VISIBLE":
      return {
        ...state,
        isCommentsVisible: true,
      };
    case "SET_COMMENTS_HIDDEN":
      return {
        ...state,
        isCommentsVisible: false,
      };
    default:
      return state;
  }
};
