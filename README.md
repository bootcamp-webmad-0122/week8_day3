# Rutas privadas
- El componente `<Outlet/>` de React Router Dom permite retornar las rutas anidadas dentro de otra `<Route>`. 
- De esta forma es posible crear un componente estratégico `PrivateRoute.jsx` mediante el que retornar el `<Outlet/>` del mismo según el estado de sesión del usuario:

  ````javascript
  const PrivateRoute() {

    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isLoggedIn) {
        return <Navigate to="/inicio-sesion" />
    }

    return <Outlet />
  }
  ````
- Este componente se comporta como una ruta superior que anida las protegidas:
  ````javascript
  <Route path="/perfil" element={<PrivateRoute />}>
      <Route path="" element={<UserProfile />} />
  </Route>
  ````
