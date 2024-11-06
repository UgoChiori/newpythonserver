import React, {useState} from "react";

const Register: React.FC = () => {
    const[username, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[email, setEmail] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(password !== password2) {
            
            alert("Paswords do not match")
            return;
    }

    const userData = {username: username, password: password, email: email, password2: password2};

    try{
        const response = await fetch(`http://localhost:8000/auth/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        if (response.ok) {
            const data = await response.json();
            console.log("User registered:", data);
            alert("Registration successful!");
          } else {
            const errorData = await response.json();
            console.error("Registration error:", errorData);
            alert("Registration failed: " + errorData.message);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during registration.");
        }
}




  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", width: "100%",border:"1px solid #ffff"}} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" 
          name="username" 
          placeholder="username" 
          value={username}
          onChange={(e)=> setUserName(e.target.value)}
          required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            placeholder="Type your password again"
            required
            value={password2}
            onChange={(e)=> setPassword2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Regiter</button>
      </form>
    </div>
  );
};

export default Register
