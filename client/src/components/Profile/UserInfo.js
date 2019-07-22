import React from 'react'
import { Link } from 'react-router-dom';

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => {
  const {
    username, email, joinDate, favourites
  } = session.getCurrentUser;
  return (
    <div>
      <h3>User Info</h3>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Join Date: {formatDate(joinDate)}</p>
      <ul>
        <h3>{username}'s Favourites</h3>
        {favourites.map(favourite => (
          <li key={favourite._id}>
            <Link to={`/recipes/${favourite._id}`}><p>{favourite.name}</p></Link>
          </li>
        ))}
        {!favourites.length && (
        <p>
          <strong>You have no favourites currently. Go add some!</strong>
        </p>
        )}
      </ul>
    </div>
  )
};

export default UserInfo;
