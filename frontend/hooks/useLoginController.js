import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

/**
 * @param { () => void } onRender
 * @returns { { canRender: boolean } }
 */
export default onRender => {
  const router = useRouter();
  const [count, setCount] = useState(0); // Persist bug workaround, lmao should get rid of later
  const [canRender, setCanRender] = useState(
    router.pathname.startsWith("/login")
  );
  const userState = useSelector(state => state.userState);
  useEffect(() => {
    // get refresh token
    const token = window.localStorage.getItem("refreshToken");
    if (!token) {
      // if there is no refresh we take them to the login page
      if (router.pathname.router != "/login") router.push("/login");
      return;
    }
    setCount(count + 1);
    if (count == 0) {
      return;
    }
    if (!userState.user._id) {
      if (router.pathname.router != "/login") router.push("/login");
      return;
    }
    // if user is logged in check user status
    //if (router.pathname.router != "/login/onboarding1") router.push("/login/onboarding1")
  }, [userState]);

  useEffect(() => {
    if (canRender) {
      onRender && onRender();
    }
  }, [canRender]);

  return {
    canRender
  };
};
