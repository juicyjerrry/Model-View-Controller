const router = require('express').Router();
const { Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//get all
router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const commentData = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const comments = commentData.map((comment) => comment.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get by id
router.get('/comment/:id', async (req, res) => {
    try {
        //find by primary key
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const comment = commentData.get({ plain: true });

        res.render('comment', {
            ...comment,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});


module.exports = router;
