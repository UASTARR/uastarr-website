import sqlite3
import os

# get the relative path to the database based on the file location
script_dir = os.path.dirname(os.path.abspath(__file__))
relative_path = "main.db"
absolute_path= os.path.join(script_dir, relative_path)

print(absolute_path)

conn = sqlite3.connect(absolute_path)

cursor = conn.cursor()

create_table_sql = '''
    CREATE TABLE albums (
        title TEXT PRIMARY KEY,
        description TEXT,
        imglink TEXT,
        albumlink TEXT
    );
'''

cursor.execute(create_table_sql)

conn.commit()

cursor.close()
conn.close()