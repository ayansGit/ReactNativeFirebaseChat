import {
    CHAT_LOAD_MESSAGES_ERROR,
    CHAT_LOAD_MESSAGES_REQUEST,
    CHAT_LOAD_MESSAGES_SUCCESS,
    CHAT_MESSAGE_ERROR,
    CHAT_MESSAGE_LOADING,
    CHAT_MESSAGE_REQUEST,
    CHAT_MESSAGE_SUCCESS,
    CHAT_MESSAGE_UPDATE,
    FIREBASE_MEDIA_UPLOAD_REQUEST,
    FIREBASE_MEDIA_UPLOAD_SUCCESS,
    FIREBASE_MEDIA_UPLOAD_ERROR
  }
    from "../actions/types"
  
  const initialState = {
    isSending: false,
    isMessageLoading: false,
    isMediaUploading: false,
    sendingError: null,
    messageLoadingError: null,
    chatData: [],
    chatSentSuccessMessage: "",
    chatImageUrl:"",
    operation_type:"INITIAL_STATE"
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case CHAT_LOAD_MESSAGES_REQUEST:
        return {
          ...state,
          operation_type: action.type,
          isMessageLoading: true
        };
      case CHAT_LOAD_MESSAGES_SUCCESS:
        return {
          ...state,
          operation_type: action.type,
          chatData: action.data,
          isMessageLoading: false
        };
      case CHAT_LOAD_MESSAGES_ERROR:
        return {
          ...state,
          operation_type: action.type,
          error: action.error,
          isMessageLoading: false
        }
      case CHAT_MESSAGE_REQUEST:
        return {
          ...state,
          operation_type: action.type,
          isSending: true
        };
      
      case CHAT_MESSAGE_SUCCESS:
        return {
            ...state,
            operation_type: action.type,
            chatSentSuccessMessage: action.data,
            isSending: false
        }

        case CHAT_MESSAGE_ERROR:
        return {
            ...state,
            operation_type: action.type,
            error: action.error,
            isSending: false
        }

        case FIREBASE_MEDIA_UPLOAD_REQUEST:
        return {
          ...state,
          operation_type: action.type,
          isMediaUploading: true
        };
        case FIREBASE_MEDIA_UPLOAD_SUCCESS:
        return {
          ...state,
          operation_type: action.type,
          chatImageUrl: action.data,
          isMediaUploading: false
        };
        case FIREBASE_MEDIA_UPLOAD_ERROR:
        return {
          ...state,
          operation_type: action.type,
          error: action.error,
          isMediaUploading: false
        };

      default:
        return state;
    }
  }
  
  export default chatReducer;