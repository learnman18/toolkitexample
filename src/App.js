import { Route, Routes } from 'react-router-dom';
import Users from './components/users/Users';
import IndividualUser from './components/users/IndividualUser';
import UserInnerPost from './components/users/UserInnerPost';

function App() {
  return (
    <>
		<Routes>
			<Route path='/' element={<Users></Users>}></Route>
			<Route path='users/:id' element={<IndividualUser></IndividualUser>}></Route>
			<Route path='posts/:postId' element={<UserInnerPost></UserInnerPost>}></Route>
		</Routes>
    </>
  );
}

export default App;
