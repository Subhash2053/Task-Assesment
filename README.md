# Laravel Task for Software Engineer (Full Stack) - PHP / Javascript



> ### Hosted on https://calm-escarpment-07306.herokuapp.com  



----------
# Solution Detail
1. Backend  api created using laravel and frontend library like  react is used.
2. Client data is taken from form that is created using Material UI library.
3. Data is validated in react as well as laravel .
4. Data is stored in csv file inside public/csv folder
5. When data is read data are displayed in datatable using react library @mui/x-data-grid


----------
## Installation

Install Latest PHP version (8.0.14+) and node version(v16.13.2+)

** command list**

    git clone https://gitlab.com/build-change/global/edatos.git
    cd edatos
    composer install
    cp .env.example .env
    php artisan key:generate
    
** for react**   

    npm install
    npm run production
     

----------

# Code overview
- `public/csv/client.csv` - Contains all the client data saved
- `app/Http/Controllers/ClientController` - Contains all the api functions for client data  
- `resources/view/home.blade.php` - Root blade file for react 
- `resources/js/component/client` - Contains all view for client
- `.circleci/config.yml` - Contains cicd config file for  circleci 
- `Dockerfile` - Docker file
- `docker/` - contains nginx ,php.ini etc configuration for docker





