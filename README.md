# Quick
Quick is supposed to be a chat and to do list app. However, the chat feature is the only feature which is ready to be used. You cannot try the to do list feature yet for now.

## App Limitation
This app uses Dummy API (https://dummyapi.io/) to simulate back end API call. However, since it is a dummy API, and it is not originally designed for chat app, there are some limitation there are some features that behaves strangely. Below are some of the strange behavior in the app due to the limitation of the API
### 1. Chat List
message displayed on the list chat are same. Message shown in each chat are also the same between one group chat to another

### 2. Chat List Search
The chat search does not work. You can still type in the search box, but it will not show you any search result

### 3. Edit Chat
Edited chat will be displayed as in a normal behavior. However, if you refresh the page, the edited chat will be reverted to initial condition. It happens since the edit only happens in the client side, and not happening in server. This behavior will be different from the send and delete chat, since those behaviors can be accomodated by the dummy API

### 4. New Message
If you open a chat for at least 3 seconds, a small popup "New Message" will appear. It is not a real incoming chat. It is actually the app send a dummy chat using different account from the account which is used for sending normal message. I design this New Message feature should appear only once. THe popup will not appear any more once you clicked the popup. 
However, if you want to test the "New Message" feature more than once, you can clear the local storage of your browser and then refresh the app.
