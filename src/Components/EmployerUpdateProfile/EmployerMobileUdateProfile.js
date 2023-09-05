import React from 'react'

const EmployerMobileUdateProfile = () => {
	return (

		<div>
			<style>
				{`
        
          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .form-group input[type="text"],
          .form-group input[type="email"],
          .form-group input[type="password"] {
            border: none;
            border-bottom: 1px solid #ccc;
            padding: 5px;
            width: 100%;
            outline: none;
            transition: border-color 0.2s ease-in-out;
          }

          .form-group input:focus {
            border-color: #007bff; /* Change this color to your preferred focus color */
          }
        `}
			</style>
			<button >Back</button>
			<form style={{ backgroundColor: 'white' }}>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" />
				</div>
				{/* Add more input fields here */}
				<button type="submit">Submit</button>
			</form>
		</div>

	)
}

export default EmployerMobileUdateProfile