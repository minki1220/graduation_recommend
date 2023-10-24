import '../../css/signUp.css';

export default function SignUpPage() {
    return (
      <div className='bg'>
      <div className="container_box">
      <div className="signup_container">
        <h1 className="headerStyle">Create An Account!</h1>
        <div className="sign_in_container">
          <form method="POST" action="/api/auth/signUp" >
            <input  name="name" type="text" placeholder="Name" /> 
            <input  name="email" type="text" placeholder="Email" />
            <input  name="password" type="password" placeholder="Password" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
      </div>
      </div>
      
    )
  }
  