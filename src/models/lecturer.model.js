export default class Lecturer {
  constructor({
    id = null,
    fullName,
    role,
    photoUrl,
    email = null,
    linkedInUrl = null,
    biography,
    education = [],
    career = [],
    programs = [],
  }) {
    this.id = id;
    this.fullName = fullName;
    this.role = role;
    this.photoUrl = photoUrl;
    this.email = email;
    this.linkedInUrl = linkedInUrl;
    this.biography = biography;
    this.education = education; 
    this.career = career;      
    this.programs = programs;  
  }
}
