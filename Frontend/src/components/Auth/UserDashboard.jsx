function UserDashboard() {

    const userId = sessionStorage.getItem('userId');

    return (
        <div>
            <h1>Registration Done!</h1>
            <h2>Your registered User id is : {userId} </h2>
        </div>
    )
}

export default UserDashboard