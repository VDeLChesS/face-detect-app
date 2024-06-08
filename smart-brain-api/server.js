import express, { json } from 'express';
import { hash as _hash } from 'bcrypt-nodejs';
import cors from 'cors';

const database = {
    users: [
        {
            id: '123',
            hash: '',
            name: 'John',
            email: 'john.doe@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            hash: '',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '$2a$10$Z19F3TH2WLiXNLlA.QSihuZrAZyzw/Nu99tIDdRhR8JGPvvFwiX3G',
            email: 'john.doe@gmail.com',
            password: 'cookies'
        }

    ]
}

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("database.users");
});

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    _hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
}
);

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
})

app.delete('/delete', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            database.users.splice(database.users.indexOf(user), 1);
            return res.json('deleted');
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
})

app.get('/users', (req, res) => {
    res.json(database.users);
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})



/*
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World, this is working');
});

app.get('/api', (req, res) => {
    res.send('This is the API page');
});

app.get('/api/data', (req, res) => {
    res.send('This is the data page');
});

app.get('/profile', (req, res) => {
    res.send('This is the profile page');
    console.log(req.query);
    const user = req.query.user;
    const age = req.query.age;
    console.log(user, age);
    res.send(`This is the profile page for user ${user} who is ${age} years old`);

});

app.post('/profile', (req, res) => {
    console.log(req.body);

    const user = {
        name: "John",
        age: 30,
        hobby: "Soccer"
    };

    console.log(`This is the profile page for user ${user.name} who is ${user.age} years old`);
    res.send(user);
});

app.get('/profile/:id', (req, res) => {
    res.send(`This is the profile page for user ${req.params.id}`);
    const user = {
        name: 'John',
        age: 30
    };
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); */