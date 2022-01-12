
const db = require('./api/models')
const {User, MatchProfile, UserMatch, Message} = db;

const users = [
    {
        id: 1,
        username: 'AnnaBanana',
        firstName: 'Anna',
        lastName: 'Davids',
        age: 15,
        email: 'anna@email.com',
        password: 'password'
    },
    {
        id: 2,
        username: 'TheJMan',
        firstName: 'James',
        lastName: 'Wu',
        age: 21,
        email: 'james@email.com',
        password: 'password'
    },
    {
        id: 3,
        username: 'BobWithTheBurgers',
        firstName: 'Bob',
        lastName: 'Belcher',
        age: 45,
        email: 'bob@email.com',
        password: 'password'
    },
    {
        id: 4,
        username: 'Lindaaa',
        firstName: 'Linda',
        lastName: 'Belcher',
        age: 43,
        email: 'linda@email.com',
        password: 'password'
    },
    {
        id: 5,
        username: 'TheSofaQueen',
        firstName: 'Rayna',
        lastName: 'Lee',
        age: 38,
        email: 'rayna@email.com',
        password: 'password'
    },
    {
        id: 6,
        username: 'StarryNight',
        firstName: 'Star',
        lastName: 'Mae',
        age: 17,
        email: 'star@email.com',
        password: 'password'
    },
    {
        id: 7,
        username: 'Donna',
        firstName: 'Donna',
        lastName: 'Davids',
        age: 29,
        email: 'donna@email.com',
        password: 'password'
    },
    {
        id: 8,
        username: 'BrushWithBeauty',
        firstName: 'Luz',
        lastName: 'Kingston',
        age: 17,
        email: 'luz@email.com',
        password: 'password'
    },
    {
        id: 9,
        username: 'MiguelMiguelMiguel',
        firstName: 'Miguel',
        lastName: 'Morales',
        age: 31,
        email: 'miguel@email.com',
        password: 'password'
    },
    {
        id: 10,
        username: 'daveyboy',
        firstName: 'Dave',
        lastName: 'Long',
        age: 22,
        email: 'dave@email.com',
        password: 'password'
    }
]

const matchProfiles = [
    {
        id: 1,
        age: 15,
        hobby: 'Art',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        userId: 1
    },
    {
        id: 2,
        age: 21,
        hobby: 'Art',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        userId: 2
    },
    {
        id: 3,
        age: 45,
        hobby: 'Art',
        bio: 'Lorem ipsum dolor sit amet',
        userId: 3
    },
    {
        id: 4,
        age: 43,
        hobby: 'Art',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        userId: 4
    },
    {
        id: 5,
        age: 38,
        hobby: 'Art',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
        userId: 5
    },
    {
        id: 6,
        age: 17,
        hobby: 'Interior Design',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        userId: 6
    },
    {
        id: 7,
        age: 29,
        hobby: 'Interior Design',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium.',
        userId: 7
    },
    {
        id: 8,
        age: 17,
        hobby: 'Interior Design',
        bio: 'Lorem ipsum.',
        userId: 8
    },
    {
        id: 9,
        age: 31,
        hobby: 'Interior Design',
        bio: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        userId: 9
    },
    {
        id: 10,
        age: 22,
        hobby: 'Interior Design',
        bio: 'Lorem ipsum dolor sit amet.',
        userId: 10
    },
]

const userMatches = [
    {
        id: 1,
        outcome: true,
        userId: 1,
        matchId: 2
    },
    {
        id: 2,
        outcome: true,
        userId: 2,
        matchId: 1
    },
    {
        id: 3,
        outcome: false,
        userId: 1,
        matchId: 3
    },
    {
        id: 4,
        outcome: true,
        userId: 3,
        matchId: 1
    },
    {
        id: 5,
        outcome: true,
        userId: 3,
        matchId: 4
    },
    {
        id: 6,
        outcome: true,
        userId: 4,
        matchId: 3
    },
    {
        id: 7,
        outcome: true,
        userId: 4,
        matchId: 5
    },
    {
        id: 8,
        outcome: false,
        userId: 6,
        matchId: 7
    },
    {
        id: 9,
        outcome: false,
        userId: 7,
        matchId: 6
    },
    {
        id: 10,
        outcome: true,
        userId: 10,
        matchId: 6
    },
    {
        id: 11,
        outcome: true,
        userId: 9,
        matchId: 8
    },
    {
        id: 12,
        outcome: true,
        userId: 8,
        matchId: 9
    }
]

const seed = () => {
    return User.bulkCreate(users)
    .then(() => MatchProfile.bulkCreate(matchProfiles))
    .then(() => UserMatch.bulkCreate(userMatches))
}

seed()
.then(() => process.exit())