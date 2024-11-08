import React from 'react'

function Home() {
  return (
    <div class="container">
    <div class="row">
        {/* <!-- First Column --> */}
        <div class="col-md-6">
            <div class="p-3 bg-primary text-white">
                <h3>Column 1</h3>
                <p>This is the first column. It takes up 50% of the width on medium screens and larger.</p>
            </div>
        </div>

        {/* <!-- Second Column --> */}
        <div class="col-md-6">
            <div class="p-3 bg-secondary text-white">
                <h3>Column 2</h3>
                <p>This is the second column. It takes up 50% of the width on medium screens and larger.</p>
            </div>
        </div>
    </div>
</div>

  )
}

export default Home