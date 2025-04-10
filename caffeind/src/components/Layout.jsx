import React from 'react'

const Layout = (props) => {
    const { children } = props;

    const header = (
        <header>
            <div>
                <h1 className='text-gradient'>CAFFIEND</h1>
                <p>For Coffee Insatiates</p>
            </div>
            <button>
                <p>Sign up free</p>
                <i class="fa-solid fa-mug-hot"></i>
            </button>
        </header>
    )

    const footer = (
        <footer>
            <p><span className='text-gradient'>Caffeind</span> was made by <a href='https://www.memol.com' target='_blank'>Memol</a><br />using the <a href="https://www.fantacss.memol.com" target='_blank'>FantaCss</a> design library</p>
        </footer>
    )

  return (
    <>
        {header}
        <main>
            {children}
        </main>
        {footer}
    </>
  )
}

export default Layout