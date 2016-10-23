requirejs.config({
    "baseUrl": "/js/lib",
    "shim": {
        "bootstrap": { "deps": ['jquery'] }
    },
    "paths": {
        "app": "../",
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
        "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min",
        "font-awesome": "//use.fontawesome.com/3c091cc8ec"
    }
});

requirejs(["app/main"]);