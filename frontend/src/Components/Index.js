import React from "react";
import indexcss from "./index.module.css";
function Index() {
  return (
    <div className="container-fluid container-fluid vh-100 bg-primary">
      <div class="row">
                <div className={`col-md-6 ${indexcss.asideDiv} `}>
                <aside className={`col-md-6 ${indexcss.aside}`}>
                  <p>Build Your Portfolio By Choosing Template</p>
                </aside>
                </div>
                <div className={`col-md-6 ${indexcss.formDiv} vh-100`}>
                  <form id={indexcss.form}>
                    <label htmlFor="name" className={indexcss.lbl}>
                      Enter your name
                    </label>
                    <input type="text" id="name" required />
                    <label htmlFor="email1" className={indexcss.lbl}>
                      Enter your email address
                    </label>
                    <input type="email" id="email1" required />
                    <label className={indexcss.lbl} htmlFor="password1">
                      Enter the Password
                    </label>
                    <input
                      type="password"
                      id="password1"
                      pattern="(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                      title="Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
                      required
                    />
                    <section id={indexcss.sectionBtn}>
                      <button type="submit">SignUp</button>
                      <button type="login">LogIn</button>
                    </section>
                  </form>
                </div>

    </div>
    </div>
  );
}

export default Index;
