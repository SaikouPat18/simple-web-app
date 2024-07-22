import React, { useEffect, useState } from 'react';
import { logout, getDetails } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { successToast } from '../services/toastService';

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getDetails();
        setUserDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      successToast(response.message);
      navigate('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>User Details</h2>

        <div className={styles.details}>
          <p><strong>ID:</strong> {userDetails?.id}</p>
          <p><strong>Username:</strong> {userDetails?.name}</p>
          <p><strong>Email:</strong> {userDetails?.email}</p>
          <p><strong>Created At:</strong> {new Date(userDetails?.created_at).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(userDetails?.updated_at).toLocaleDateString()}</p>
          <p><strong>Email Verified At:</strong> {new Date(userDetails?.email_verified_at).toLocaleDateString()}</p>
        </div>

        <button
          className={styles.button_logout}
          onClick={handleLogout}
        >{loading ? (
          <div className={styles.spinner}>
            <div className={styles.spinnerIcon}></div>
          </div>
        ) : (
          'Logout'
        )}

        </button>
      </div>
    </div>
  );
};

export default UserDetails;
