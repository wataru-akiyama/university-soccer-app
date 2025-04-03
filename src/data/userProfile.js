// デフォルトのユーザープロフィール構造
const userProfile = {
    personalInfo: {
      name: "",
      highSchool: "",
      height: null,
      weight: null,
      position: "",
      footedness: "",
      graduationYear: null,
      playStyle: "",
      appeal: ""
    },
    photos: {
      profile: null,
      action: []
    },
    videos: [], // { id, url, thumbnail, title, updatedAt }
    achievements: [], // { id, title, result, year, description }
    reviews: [], // { id, reviewer, organization, rating, text }
    universityMessages: "",
    activities: [] // { id, type, title, date, details }
  };
  
  export default userProfile;