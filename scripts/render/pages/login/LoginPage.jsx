import React from "react";

class LoginPage extends React.Component {
  render() {
    return <div id = "main_area">
    			<div id = "login">
    				<span>
    					 Sign in with
    				</span>
						<span id="google_login" className="login_buttons">
							<a href="/auth/google">
								Google
								<i className="fa fa-google-plus"></i>
							</a>						
						</span>
						<span id="facebook_login" className="login_buttons">
							<a href="/auth/facebook">
								Facebook 
						  		<i className="fa fa-facebook-official"></i>
							</a>
 						</span>					
    			</div>
    		</div>;
  }
}
 
export default LoginPage;