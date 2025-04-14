import {ChangeEvent, Dispatch, SetStateAction, MouseEvent} from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {auth} from '@/services/firebase';
import {NavigateFunction} from 'react-router-dom';
import {RouteNames} from '@/constants/routeNames';

/**
 * Handles input change events for an admin login form.
 * Updates the form data state with the new input value and resets any error messages.
 *
 * @param e - The change event triggered by an input field.
 * @param setFormData - Function to update the form data state.
 * @param setError - Function to update the error state.
 */
export const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  setFormData: Dispatch<SetStateAction<{email: string; password: string}>>,
  setError: Dispatch<SetStateAction<{error: string; password?: boolean}>>,
) => {
  const {name, value} = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
  }));
  setError({error: ''});
};

/**
 * Handles the admin login form submission.
 * Validates the input, logs in the user using Firebase's `signInWithEmailAndPassword` method,
 * and saves the ID token and refresh token to local storage using the `setToken` function.
 * If the login is successful, sets the `success` state to `true`.
 *
 * @param e - The mouse event triggered by the login form submission.
 * @param allowedAdminEmail - The allowed admin email address.
 * @param setError - Function to update the error state.
 * @param loading - The loading state.
 * @param formData - The form data state.
 * @param setLoading - Function to update the loading state.
 * @param setSuccess - Function to update the success state.
 * @param setToken - Function to save the ID token and refresh token to local storage.
 * @returns A promise that resolves with an object containing a boolean indicating whether the tokens were saved successfully.
 */
export const handleAdminLoginSubmit = async (
  e: MouseEvent<HTMLButtonElement>,
  allowedAdminEmail: string,
  setError: Dispatch<SetStateAction<{error: string; password?: boolean}>>,
  formData: {email: string; password: string},
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction,
) => {
  e.preventDefault();
  if (!formData.email) {
    setError({error: '❌ Email cannot be empty!'});
    return;
  }
  if (!formData.password) {
    setError({error: '❌ Password cannot be empty!', password: true});
    return;
  }

  if (formData.email !== allowedAdminEmail) {
    setError({error: '❌ Not a registered admin!'});
    return;
  }

  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password,
    );
    if (!userCredential) {
      alert('❌ Error logging in!');
      setError({error: '❌ Error logging in!'});
      return;
    }
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(RouteNames.HOME);
      window.scrollTo(0, 0);
    }, 3000);
  } catch (error: any) {
    setLoading(false);
    setSuccess(false);
    setError({error: '❌ Login failed: ' + error.message});
    alert('❌ Login failed: ' + error.message);
  }
};

/**
 * Handles a Google login event.
 *
 * @param e - The event that triggered this function.
 * @param allowedAdminEmail - The email of the admin that is allowed to login.
 * @param setError - A function to set the error state.
 * @param setLoading - A function to set the loading state.
 * @param setSuccess - A function to set the success state.
 * @param setToken - A function to set the id token and refresh token.
 */
export const handleAdminGoogleLogin = async (
  e: MouseEvent<HTMLButtonElement>,
  allowedAdminEmail: string,
  setError: Dispatch<SetStateAction<{error: string; password?: boolean}>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction,
) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    if (!result) {
      setError({error: '❌ Error fetching data!'});
      return;
    }
    const user = result.user;

    if (!user.email || user.email !== allowedAdminEmail) {
      setError({error: '❌ Not a registered admin!'});
      alert('❌ Not a registered admin!');
      return;
    }
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(RouteNames.HOME);
      window.scrollTo(0, 0);
    }, 3000);
  } catch (error: any) {
    setLoading(false);
    console.error('❌ Google login failed:', error.message);
    alert('Google login failed: ' + error.message);
  }
};

/**
 * Handles the admin forgot password functionality.
 * Validates the email input, checks if it matches the allowed admin email,
 * and sends a password reset email using Firebase's `sendPasswordResetEmail` method.
 * Updates the loading and error states accordingly and displays alerts based on the outcome.
 *
 * @param e - The mouse event triggered by the forgot password action.
 * @param allowedAdminEmail - The allowed admin email address.
 * @param formData - The form data state containing the email and password.
 * @param setError - Function to update the error state.
 * @param setLoading - Function to update the loading state.
 */
export const handleAdminForgotPassword = async (
  e: MouseEvent<HTMLButtonElement>,
  allowedAdminEmail: string,
  formData: {email: string; password: string},
  setError: Dispatch<SetStateAction<{error: string; password?: boolean}>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  e.preventDefault();
  if (!formData.email) {
    setError({error: 'Please enter your admin email first.'});
    return;
  }

  if (formData.email !== allowedAdminEmail) {
    alert('❌ Not a registered admin!');
    setError({error: '❌ Not a registered admin!'});
    return;
  }
  setLoading(true);
  try {
    await sendPasswordResetEmail(auth, formData.email);
    alert('✅ Password reset email sent. Please check your inbox.');
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    console.error('❌ Failed to send reset email:', error.message);
    alert('Failed to send reset email: ' + error.message);
    setError({error: 'Failed to send reset email: ' + error.message});
  }
};
