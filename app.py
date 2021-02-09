import json
import pandas as pd
import pymysql
from sqlalchemy import create_engine
import sqlalchemy
from flask import Flask, request, render_template, jsonify
import os

# Heroku check
is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True

# Flask

# SQL Alchemy

# PyMySQL

# Pandas

# JSON

# Import your config file(s) and variable(s)
if is_heroku == True:
    # if IS_HEROKU is found in the environment variables, then use the rest
    # NOTE: you still need to set up the IS_HEROKU environment variable on Heroku (it is not there by default)
    remote_db_endpoint = os.environ.get('remote_db_endpoint')
    remote_db_port = os.environ.get('remote_db_port')
    remote_db_name = os.environ.get('remote_db_name')
    remote_db_user = os.environ.get('remote_db_user')
    remote_db_pwd = os.environ.get('remote_db_pwd')
else:
    # use the config.py file if IS_HEROKU is not detected
    from config import remote_db_endpoint, remote_db_port, remote_db_name, remote_db_user, remote_db_pwd

# Configure MySQL connection and connect
pymysql.install_as_MySQLdb()
engine = create_engine(
    f"mysql://{remote_db_user}:{remote_db_pwd}@{remote_db_endpoint}:{remote_db_port}/{remote_db_name}")

conn = engine.connect()

keyword = "all"
price = 0
rating = 0

# Initialize Flask application
app = Flask(__name__)

# Set up your default route


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/city/<name>")
def city(name=None):
    print(name)

    if name == "SanJuan":
        cityname = "San Juan"
    else:
        cityname = name

    sql_statement = "SELECT keyword as Type, count(*) as Total from pr.restaurants_tbl where city='" + str(
        cityname) + "' group by keyword"

    type_df = pd.read_sql(sql_statement, con=engine)

    csvfile = "static/data/" + name + ".csv"
    type_df.to_csv(csvfile, index=False)

    sql_statement = "SELECT name as 'Restaurant Name', keyword as Type, business_status as Status, price_level as Price, rating as Rating, address as Address from pr.restaurants_tbl where city ='" + cityname + "' group by keyword, name"

    info_df = pd.read_sql(sql_statement, con=engine)
    print(sql_statement)

    html = info_df.to_html(index=False, table_id='city_tbl', classes='display')

    return render_template('city.html', rating_table=html, cityname=cityname, filename=name, chart='bar')


@app.route('/search', methods=['POST'])
def search():
    print(f"search")

    city = request.form['cityID']
    keyword = request.form['typeID']
    price = request.form['priceID']
    rating = request.form['ratingID']
    chart = request.form['chart']

    print(f"city= {city}  {keyword}  {price}  {rating}")

    if city == "San Juan":
        name = "SanJuan"
    else:
        name = city

    sql_statement = "SELECT keyword as Type, count(*) as Total from pr.restaurants_tbl where city='" + str(
        city) + "' group by keyword"

    type_df = pd.read_sql(sql_statement, con=engine)

    csvfile = "static/data/" + name + ".csv"
    type_df.to_csv(csvfile, index=False)

    sql_statement = "SELECT name as 'Restaurant Name', keyword as Type, business_status as Status, price_level as Price, rating as Rating, address as Address from pr.restaurants_tbl where city='" + str(
        city) + "' "

    if keyword != "all":
        sql_statement = sql_statement + " and keyword='" + keyword + "' "

    if price != 0:
        sql_statement = sql_statement + \
            " and price_level >=" + price + " "

    if rating != 0:
        sql_statement = sql_statement + " and rating >=" + rating + " "

    sql_statement = sql_statement + "group by keyword"
    print(sql_statement)

    info_df = pd.read_sql(sql_statement, con=engine)
    print(sql_statement)

    html = info_df.to_html(index=False, table_id='city_tbl', classes='display')

    return render_template('city.html', rating_table=html, cityname=city, filename=name, chart=chart)


@app.route('/map', methods=['POST', 'GET'])
def map():
    print("map")

    selectedValue = request.form['chkMap']
    city = request.form['city_id']
    chart = request.form['chart']

    print(f"selectedValue={selectedValue}   {city}")

    if city == "San Juan":
        name = "SanJuan"
    else:
        name = city

    sql_statement = "SELECT keyword as Type, count(*) as Total from pr.restaurants_tbl where city='" + str(
        city) + "' group by keyword"

    type_df = pd.read_sql(sql_statement, con=engine)

    csvfile = "static/data/" + name + ".csv"
    type_df.to_csv(csvfile, index=False)

    sql_statement = "SELECT name as 'Restaurant Name', keyword as Type, business_status as Status, price_level as Price, rating as Rating, address as Address from pr.restaurants_tbl where city='" + str(
        city) + "' "

    if keyword != "all":
        sql_statement = sql_statement + " and keyword='" + keyword + "' "

    if price != 0:
        sql_statement = sql_statement + \
            " and price_level >=" + price + " "

    if rating != 0:
        sql_statement = sql_statement + " and rating >=" + rating + " "

    sql_statement = sql_statement + "group by keyword"
    print(sql_statement)

    info_df = pd.read_sql(sql_statement, con=engine)
    print(sql_statement)

    html = info_df.to_html(index=False, table_id='city_tbl', classes='display')

    return render_template('city.html', rating_table=html, cityname=city, filename=name, chart=chart)


@app.route('/info')
def info():

    return render_template('info.html')


@app.route('/team')
def team():

    return render_template('index.html')


# set up the data route
@app.route('/api/restaurants')
def get_restaurants():

    # Establish DB connection
    conn = engine.connect()

    query = '''
        SELECT
            *
        FROM
            restaurants
        '''

    resturants_data = pd.read_sql(query, con=conn)
    resturants_json = resturants_data.to_json(orient='records')

    conn.close()
    return resturants_json


if __name__ == "__main__":
    app.run(debug=True)
