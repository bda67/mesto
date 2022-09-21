export class UserInfo {
    constructor({ profileName, profileJob, profileAvatar }) {
        this._profileName = profileName;
        this._profileJob = profileJob;
        this._profileAvatar = profileAvatar;
    }
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
            avatar: this._profileAvatar.src
        }
    }
    // получаем id пользователя
    getUserId() {
        return this._userId;
    }
    // устанавливаем id пользователя
    setUserId(userId) {
        this._userId = userId;
    }
    setUserInfo(data) {
        if(data.name) this._profileName.textContent = data.name;
        if(data.about) this._profileJob.textContent = data.about;
        this.setAvatarPicture(data);
    }
    setAvatarPicture(data) {
        if(data.avatar) this._profileAvatar.src = data.avatar;
        if(data.name) this._profileAvatar.alt = data.name;
    }
    
}