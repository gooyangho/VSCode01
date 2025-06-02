//파이어베이스 서비스에 연결하기 위한 임포트
import {initializeApp} from "firebase/app";
//파이어스토어 데이터베이스 사용을 위한  임포트
import {getFirestore} from "firebase/firestore";

//파이어베이스 콘솔에서 발급받은 API정보(SDK정보)
//const firebaseConfig = {
//  apiKey: "AIzaSyAeEbQQ0JZ8MKC0FXXfpXlvJRP3jOLBmKE",
//  authDomain: "myreactapp-5b92d.firebaseapp.com",
//  projectId: "myreactapp-5b92d",
//  storageBucket: "myreactapp-5b92d.firebasestorage.app",
//  messagingSenderId: "823877283369",
//  appId: "1:823877283369:web:7c83878133dcbee1217638",
//  measurementId: "G-57GYH1SBHF"
//};

//.env 파일 생성 후
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId,
};



//firebase에 연결 후 앱 초기화 
const app =initializeApp(firebaseConfig);
//firestore 사용을 위한 객체 생성
const firestore = getFirestore(app);
export {firestore};