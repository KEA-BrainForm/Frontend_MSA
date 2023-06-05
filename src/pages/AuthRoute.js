import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function AuthRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
  )
}
