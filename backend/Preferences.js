const preferences_data = require('data-store')({ path: process.cwd() + '/data/preferences.json' });

class Preferences {
    constructor(id, owner, genres, movies) {
        this.id = id;
        this.owner = owner;
        this.genres = genres;
        this.movies = movies;
    }

    update(genres, movies) {
        this.genres = genres;
        this.movies = movies;
        preferences_data.set(this.id.toString(), this);
    }

    delete() {
        preferences_data.del(this.id.toString());
    }
}

Preferences.getAllIDS = () => {
    return Object.keys(preferences_data.data).map(id => parseInt(id));
}

Preferences.getAllIDsForOwner = (owner) => {
    return Object.keys(preferences_data.data).filter(id => preferences_data.get(id).owner == owner).map(id => parseInt(id));
}

Preferences.findByID = (id) => {
    let sdata = preferences_data.get(id);
    if (sdata != null) {
        return new Preferences(sdata.id, sdata.owner, sdata.movies);
    }
    return null;
};

Preferences.next_id = Preferences.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

Preferences.create = (owner, preferences) => {
    let id = Preferences.next_id;
    Preferences.next_id += 1;
    let s = new Preferences(id, owner, moves);
    preferences_data.set(s.id.toString(), s);
    return s;
}

module.exports = Preferences;
