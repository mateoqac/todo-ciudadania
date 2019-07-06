import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
	constructor() {
		
	}

	signInWithEmail(credentials) {
		// console.log('Sign in with email');
		// return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
		// 	 credentials.password);
    }
    
    async signUp(credentials) {
			// try{
			// 	const result = await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
			// 	console.log(result)
			// }
			// catch(e){
			// 	console.error(e)
			// }
    }

//     signInWithGoogle() {
// 		console.log('Sign in with google');
// 		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
// }

// private oauthSignIn(provider: AuthProvider) {
// 	if (!(<any>window).cordova) {
// 		return this.afAuth.auth.signInWithPopup(provider);
// 	} else {
// 		return this.afAuth.auth.signInWithRedirect(provider)
// 		.then(() => {
// 			return this.afAuth.auth.getRedirectResult().then( result => {
// 				// This gives you a Google Access Token.
// 				// You can use it to access the Google API.
// 				let token = result.credential.accessToken;
// 				// The signed-in user info.
// 				let user = result.user;
// 				console.log(token, user);
// 			}).catch(function(error) {
// 				// Handle Errors here.
// 				alert(error.message);
// 			});
// 		});
// 	}
// }

}