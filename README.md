<h3>Server:</h3><br>
https://stormy-cove-24294.herokuapp.com/

<h3>User routs:</h3><br>
GET <'server'>/user/all "Get all users"<br>
GET <'server'>/user/find/:id "Get user from id"<br>
POST <'server'>/user/add/ "Add new user"<br>

<p>{
"email": "<'email'>",
"name": "<'name'>",
"password": "<'password'>"
}</p><br>
POST <'server'>/user/login/ "Login user - sending Token"<br>
<p>
{
"email": "<'email'>",
"password": "<'password'>"
}
</p><br>
POST <'server'>/user/logout/ "Logout user"<br>
<h3>Recipes routs</h3><br>
GET <'server'>/ricepes/all "Get all recipes"<br>
POST <'server'>/ricepes/create "Create recipes"<br>

<p>{<br>
"recipe_name": "<'recipe_name'>",<br>
"category": "<'category'>",<br>
&nbsp;"description": "<'description'>",<br>
&nbsp;"ingredients": [<br>
&nbsp;&nbsp;&nbsp;"<'ingredients-1'>",<br>
&nbsp;&nbsp;&nbsp;"<'ingredients-2'>",<br>
&nbsp;&nbsp;&nbsp;"<'ingredients-№'>",<br>
],<br>
"recipe": [<br>
&nbsp;{<br>
&nbsp;&nbsp;"image_path":"<'image_path'>"<br>
&nbsp;&nbsp;"step-1":"<'step-1'>"<br>
&nbsp;},<br>
&nbsp;{<br>
&nbsp;&nbsp;"image_path":"<'image_path'>"<br>
&nbsp;&nbsp;"step-2":"<'step-2'>"<br>
&nbsp;},<br>
&nbsp;{<br>
&nbsp;&nbsp;"image_path":"<'image_path'>"<br>
&nbsp;&nbsp;"step-№":"<'step-№'>"<br>
&nbsp;},<br>
]
}</p><br>

GET <'server'>/recipe/:recipeId "Get recipe from id - sending recipes"<br>
GET <'server'>/ingredient "Get recipes from ingredient"<br>

<p>{
"ingredient": "<'ingredient'>",
}</p><br>
DELETE <'server'>/recipe/:recipeId "Delete recipe from id"<br>
PATH <'server'>/recipe/:recipeId "Update recipe from id"<br>
GET <'server'>/recipe/user/:userName "Get all user recipes - sending recipes array"<br>
