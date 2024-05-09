import React from "react";
function Nav()
{
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                  <div class="navbar-brand" style={{fontSize:"230%"}}>Annotator <i class="fa-brands"></i></div>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarContent">
                  </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;