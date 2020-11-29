const Navigation= ({isSignIn,onRouteChange}) => {
     if(isSignIn===true){
        return(
            <nav style={{display : 'flex',justifyContent:'flex-end'}}>
                <p onClick={()=> onRouteChange("signout")} className ="underline pointer f3 link dim ph3 pv2 mb2 dib white bg-mid-gray">Sign out</p>
            </nav>
        )
     }else{
         return(
            <nav style={{display : 'flex',justifyContent:'flex-end'}}>
            <p onClick={()=> onRouteChange("signin")} className =" mr2 underline pointer f3 link dim ph3 pv2 mb2 dib white bg-mid-gray">Sign in</p>
            <p onClick={()=> onRouteChange("register")} className ="underline pointer f3 link dim ph3 pv2 mb2 dib white bg-mid-gray">Register</p>
            
        </nav>
         )
     }
    }
    export default Navigation;