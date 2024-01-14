'''
main.py
The main file for running the project.
'''

import getpass  # Used for securely reading in password
import os
import sqlite3
import sys  # For command-line argument parsing
import random # For generating session number
from datetime import date
import time  # For sleep(), which lets you add delays to menus

class Text:
    '''
    A fun static class for adding color/style to terminal output.
    Should be platform agnostic as it uses ANSI escape sequences.
    '''
    def bold(text):
        return "\033[1m{}\033[0m".format(text)

    def underline(text):
        return "\033[4m{}\033[0m".format(text)

    def red(text):
        return "\033[91m{}\033[0m".format(text)

    def green(text):
        return "\033[92m{}\033[0m".format(text)

    def yellow(text):
        return "\033[93m{}\033[0m".format(text)

    def blue(text):
        return "\033[94m{}\033[0m".format(text)

    def purple(text):
        return "\033[95m{}\033[0m".format(text)

    def cyan(text):
        return "\033[96m{}\033[0m".format(text)

    def grey(text):
        return "\033[97m{}\033[0m".format(text)

class Application:
    def __init__(self, db):
        self.uid = None
        self.sessionNum = 0
        self.sessionStart = 0

        # Step One: Connect to database
        self.db = db
        self.conn = sqlite3.connect(self.db)
        self.cur = self.conn.cursor()
        # Step Two: Create variables for useful information that will be retrieved later
        self.uid = ''  # UID of logged in user
        self.name = ''  # Name of logged in user
        # Start with initial menu
        self.initialMenu()

    ''' ===== Utility Functions ===== '''

    def clearScreen(self):
        '''
        Clears the command line. For use in interactive menus. Is platform-agnostic.
        '''
        operating_system = sys.platform
        if (operating_system == 'linux') or (operating_system == 'darwin'):
            os.system('clear')
        elif (operating_system == 'win32') or (operating_system == 'cygwin'):
            os.system('cls')
        else:
            raise SystemError('ERROR: Incompatible operating system!')

    def cleanExit(self):
        '''
        Wipes the command line and exits the program.
        Disconnects from database too.
        '''
        self.clearScreen()
        self.userEndSession()
        self.conn.commit()
        self.conn.close()
        exit()

    def errorMsg(self, msg):
        '''
        Displays an error message in red, waits until delay is over, then does something.
        '''
        ERROR_DELAY = 1.5  # Number of seconds to wait before error msg goes away.
        print(Text.red(msg))
        time.sleep(ERROR_DELAY)

    def warningMsg(self, msg):
        '''
        Similar to errorMsg, but with yellow text. Used for less serious messages (ie. session management)
        '''
        ERROR_DELAY = 1.5  # Number of seconds between print statement and letting the user do something
        print(Text.yellow(msg))
        time.sleep(ERROR_DELAY)
    

    ''' ===== Menus ===== '''

    def initialMenu(self):
        self.clearScreen()
        print('\nWelcome to the CMPUT 291 Mini-Project 1 Application!\n')
        print('Loaded database: ', Text.green(self.db))
        print('Please select an option from below.\n')
        print('1. Log In')
        print('2. Sign Up\n')
        print('3. Exit Program\n')

        x = input()
        if (x == '1'):
            print('Log in selected!')
            self.loginMenu()
        elif (x == '2'):
            print('Sign up selected!')
            self.signUpMenu()
        elif (x == '3'):
            self.cleanExit()
        else:
            self.errorMsg('Invalid answer. Please select another option.')
            self.initialMenu()


    def signUpMenu(self):
        '''The sign up menu of the application. '''

        self.clearScreen()
        print('Sign Up\n')
        # Get user input
        username = input('User ID: ')
        name = input('Name: ')
        password = getpass.getpass(prompt='Password: ')

        # After getting password, check if user OR artist already exists
        # Rationale: If an artist already exists and a user happens to create an account with the same ID,
        # then the artist gets access to the account if the user/password happen to match even if two different
        # people made the accounts.
        self.cur.execute('''
        SELECT COUNT(name) FROM users WHERE uid=:user
        ''', {'user': username})
        user_count = self.cur.fetchone()[0]  # Returns 0 if user does not exist, 1 if user does
        self.cur.execute('''
        SELECT COUNT(name) FROM artists WHERE aid=:user
        ''', {'user': username})

        if user_count:  # Checks for any non-zero value
            # User must already exist, so display error, wait, and then go back to menu
            self.errorMsg('ERROR: User with the name "{}" already exists.'.format(username))
            self.initialMenu()
        else:
            # User is brand new, so add it to database and save right away
            self.cur.execute('''
            INSERT INTO users VALUES (:uid, :name, :pwd);
            ''', {'uid': username, 'name': name, 'pwd': password})
            self.uid = username
            self.conn.commit()

            # Cache login credentials and go to the user action menu
            self.uid = username
            self.name = name
            self.userActionMenu()


    def loginMenu(self):
        '''The login menu of the application.'''

        self.clearScreen()
        print('Log In\n')

        # Get user input
        user_id = input('User ID: ')
        password = getpass.getpass(prompt='Password: ')

        # After getting password, check if input is artist and/or user
        # NOTE: Queries don't check for matching password because otherwise, it would be
        # impossible to differentiate the "wrong password" and "user or artist" case (see below).
        self.cur.execute('''
        SELECT uid, name, pwd FROM users WHERE uid=:userid;
        ''', {'userid': user_id})
        user_row = self.cur.fetchall()
        self.cur.execute('''
        SELECT aid, name, pwd FROM artists WHERE aid=:userid;
        ''', {'userid': user_id})
        artist_row = self.cur.fetchall()

        user_exists = len(user_row) > 0
        artist_exists = len(artist_row) > 0

        # Check each case individually
        
        # Case 1: User doesn't exist AND artist doesn't exist.
        if (not user_exists and not artist_exists):
            # No user exists, go back to main menu
            self.errorMsg('ERROR: No such user exists.')
            self.initialMenu()
        # Case 2: Only a user exists
        elif (user_exists and not artist_exists):
            db_pwd = user_row[0][2]
            if (password != db_pwd):
                # Wrong password!
                self.errorMsg('ERROR: Incorrect password.')
                self.initialMenu()
            else:
                # Log into user account
                self.uid = user_id
                self.name = user_row[0][1]
                self.userActionMenu()
        # Case 3: Only an artist exists
        elif (artist_exists and not user_exists):
            db_pwd = artist_row[0][2]
            if (password != db_pwd):
                # Wrong password!
                self.errorMsg('ERROR: Incorrect password.')
                self.initialMenu()
            else:
                # Log into artist account
                self.uid = user_id
                self.name = artist_row[0][1]
                self.artistActionMenu()
        # Case 4: Both a user and artist exist
        elif (user_exists and artist_exists):
            # Special case where program user must choose between user and artist
            # First, check if all the passwords match
            db_pwd_user = user_row[0][2]
            db_pwd_artist = artist_row[0][2]
            can_log_into_user = (password == db_pwd_user)  # If password matches user account, store it in variable
            can_log_into_artist = (password == db_pwd_artist)  # If password matches artist account, store it

            # If there's at least one of the two accounts that cannot be logged into, handle cases accordingly
            if (not (can_log_into_artist and can_log_into_user)):
                # Figure out if user can log into an account or not
                if (not can_log_into_user and not can_log_into_artist):
                    # Use the typical "incorrect password" routine
                    self.errorMsg('ERROR: Incorrect password.')
                    self.initialMenu()
                elif (can_log_into_user):
                    # Log into just the user account
                    self.uid = user_id
                    self.name = user_row[0][1]
                    self.userActionMenu()
                elif (can_log_into_artist):
                    # Log into just the artist account
                    self.uid = user_id
                    self.name = artist_row[0][1]
                    self.artistActionMenu()
                else:
                    raise ValueError('Somehow the logic failed in the login step.')
            # Otherwise, the only possible case is that there is a matching user/artist login, in which case present
            # the option to pick between the two.
            else:
                self.userOrArtistMenu(user_id, user_row, artist_row)
        else:
            # Cases above should be exhaustive, so throw an error here?
            raise ValueError("Somehow the login logic was not exhaustive. Program functioned incorrectly.")


    def userOrArtistMenu(self, user_id, user_data, artist_data):
        '''A special menu to help handle the user/artist discrepancy case'''
        # Case where user is both a user and an artist
        print('\nWould you like to log in as a user or as an artist?\n')
        print('1) User')
        print('2) Artist\n')
        userinput = input()
        if (userinput == '1'):
            self.uid = user_id
            self.name = user_data[0][1]
            self.userActionMenu()
        elif (userinput == '2'):
            self.uid = user_id
            self.name = artist_data[0][1]  # Technically this allows for the same user to have a different user and artist name!
            self.artistActionMenu()
        else:
            # Invalid input
            self.errorMsg('Invalid answer. Please select another option.')
            self.userOrArtistMenu(user_id, user_data, artist_data)


    def userActionMenu(self):
        '''The menu presented after a user account logs in.'''
        self.clearScreen()
        print('Logged in as User: {}'.format(self.name))
        print('')
        print('1) Start a Session')
        print('2) Search for songs and playlists')
        print('3) Search for artists')
        print('4) End the session')
        print('')
        print('5) Log out')
        print('6) Exit application')
        print('')
        userinput = input('Select an option: ')
        if (userinput == '1'):
            if (self.sessionStart != 0):
                self.warningMsg('WARNING: There is already an ongoing session.')
            else:
                self.userStartSession()
        elif (userinput == '2'):
            self.userSearchSongsAndPlaylists()
        elif (userinput == '3'):
            self.userSearchForArtists()
        elif (userinput == '4'):
            self.userEndSession()
        elif (userinput == '5'):
            self.logout()
        elif (userinput == '6'):
            self.cleanExit()
        else:
            self.errorMsg('Invalid answer. Please select another option.')
            self.userActionMenu()
        self.userActionMenu()


    def artistActionMenu(self):
        '''The menu presented after an artist account logs in.'''
        self.clearScreen()
        print('Logged in as Artist: {}'.format(self.name))
        print('')
        print('1) Add a song')
        print('2) Find top fans and playlists')
        print('')
        print('3) Log out')
        print('4) Exit application')
        print('')
        userinput = input('Select an option: ')
        if (userinput == '1'):
            self.artistAddSong()
        elif (userinput == '2'):
            self.artistFindTopFans()
        elif (userinput == '3'):
            self.logout()
        elif (userinput == '4'):
            self.cleanExit()
        self.artistActionMenu()

    def logout(self):
        '''Logs the user out and sends them back to the main menu.'''
        self.uid = ''
        self.name = ''
        self.initialMenu()

    ''' ===== User Functionality / Song Actions ===== '''

    def userSearchForArtists(self):
        ''' User Searching for an Artists '''
        self.clearScreen()
        keyword = input("Search: ")
        print("")
        arrayKeywords = keyword.split()
        values = {}
        count = 1
        for word in arrayKeywords:
            self.cur.execute("""
            SELECT a.name, a.nationality, s.title, sum(s.duration)
            FROM artists a, perform p, songs s
            WHERE a.name LIKE :keyword AND p.aid = a.aid AND p.sid = s.sid
            GROUP BY a.name
            LIMIT 1;
            """, {'keyword': '%'+word+'%'})  
            rows = self.cur.fetchall()
            if len(rows) != 0:
                values[count] = [rows[0][0], rows[0][1], rows[0][2], rows[0][3]]
                count += 1
            
            self.cur.execute("""
            SELECT a.name, a.nationality, s.title, sum(s.duration)
            FROM artists a, perform p, songs s
            WHERE a.aid = p.aid AND p.sid = s.sid AND a.name in 
            (SELECT a1.name 
            FROM artists a1, perform p1, songs s1 
            WHERE p1.aid = a1.aid and p1.sid = s1.sid and s1.title LIKE :keyword)
            GROUP BY a.name
            LIMIT 1;
            """, {'keyword': '%'+word+'%'})
            rows = self.cur.fetchall()
            if len(rows) != 0:
                values[count] = [rows[0][0], rows[0][1], rows[0][2], rows[0][3]]
                count += 1
        
        if (len(values) == 0):
            self.errorMsg("No Artist Search Results")
        elif (len(values) > 5):
            option = input("There are more than 5 matches. Would you like to view all of them? Y/N ")
            if (option.lower() == 'n'):
                # run query that only shows 5 of them
                for i in range(1, 6):
                    print(str(i)+'.', values[i][0], values[i][1], values[i][2], values[i][3])
                self.errorMsg("")
                self.selectArtists(values)
            else:
                for i in range(1, len(values)+1):
                    print(str(i)+'.', values[i][0], values[i][1], values[i][2], values[i][3])
                self.errorMsg("")
                self.selectArtists(values)
        else:
            for i in range(1, len(values)+1):
                    print(str(i)+'.', values[i][0], values[i][1], values[i][2], values[i][3])
            self.errorMsg("")
            self.selectArtists(values)
        return

    def selectArtists(self, values):
        ''' User Select an Artists '''
        selection = input("Would you like to select any of the values in the search? (Y/N) ")
        if (selection.lower() == "n"):
            self.warningMsg("Back to User Menu")
            return
        elif (selection.lower() == "y"):
            numSelection = int(input("Which number would you like to pick? (\"1\"): "))
            print("")
            try:
                values[numSelection]
            except:
                self.errorMsg("Incorrect Input or Input out of Range")
                print("")
                self.selectArtists(values)
                return
                
            self.cur.execute("""
            SELECT s.sid, s.title, s.duration
            FROM artists a, perform p, songs s
            WHERE a.name LIKE :artist AND a.aid = p.aid and p.sid = s.sid
            """, {'artist' : values[numSelection][0]})
            songs = {}
            rows = self.cur.fetchall()
            count = 1
            for each in rows:
                songs[str(count)] = each
                print(str(count)+".", each[0], each[1], each[2])
                count += 1
            ''' Ask user to pick a song from artists and then play it'''
            try:
                print("")
                selectAns = input("Select a song (\"1\"): ")
                self.performSongAction(songs[str(selectAns)][0])
            except:
                self.errorMsg("Incorrect input or Input out of range")
                return
        else:
            self.errorMsg("Incorrect option")
            self.selectArtists(values)
        return

    def more_information(self, sid):
        self.clearScreen()
        """ Prints information of the song """
        # start a new session if no session is going

        # add value to the listen table if uid has not listened to the song yet
        # if uid has already listened to the song
            # increase the listen count.
        
        self.cur.execute("""
        With songInfo(name, aid, sid, duration) AS (
        SELECT a.name, a.aid, s.sid, s.duration
        FROM perform p, artists a, songs s
        WHERE s.sid = :sid AND s.sid = p.sid and p.aid = a.aid),
        song_in_playlist(sid, pName) AS (
        SELECT p.sid, p1.title
        FROM plinclude p, playlists p1
        WHERE p.sid = :sid AND p1.pid = p.pid)
        SELECT name, aid, sid, duration, ifnull(pName, 0)
        FROM songInfo left outer join song_in_playlist using (sid);
        """, {'sid': sid})

        rows = self.cur.fetchall()

        # If the song belongs in a playlist
        if (rows[0][4] != 0):
            # kind of security hazard to show artists id
            # Do string formatting
            print("")
            print("Artist: {}, Artist ID: {}, Song ID: {}, Duration: {}".format(rows[0][0],rows[0][1],rows[0][2],rows[0][3]))
            print("")
            print("This song belongs in the Playlist(s): ")
            count = 1
            for each in rows:
                print(str(count)+".", each[4])
                time.sleep(0.2)
                count += 1
        else:
            print("Artist: {}, Artist ID: {}, Song ID: {}, Duration: {}".format(rows[0][0],rows[0][1],rows[0][2],rows[0][3]))
            time.sleep(0.5)

        # pause so that user can digest information
        print("")
        while True:
            done = input("Done? (Y/N): ")
            if done.lower() == 'y':
                break
            elif done.lower() == 'n':
                continue
            else:
                self.errorMsg("Incorrect Input")
        return

   
    def listen_song(self, sid):
        """ Listen to the song and then update the table values """
        self.cur.execute("""SELECT *
        FROM listen l
        WHERE l.uid = :userId AND l.sid = :sid;""", {'userId': self.uid, 'sid': sid})

        rows = self.cur.fetchall()

        if len(rows) == 0:
            # If users first time listening to the song
            self.cur.execute("""
            INSERT INTO listen VALUES (:uid, :sno, :sid, 1);""", {'uid': self.uid, 'sno': self.sessionNum, 'sid': sid})
        else:
            # If this is users first time listening to the song
            self.cur.execute("""
            UPDATE listen SET cnt = :increment
            WHERE uid = :uid AND sid = :sid;""", {'increment': rows[0][3]+1,'uid': self.uid, 'sid': sid})

        self.conn.commit()
        self.clearScreen()
        print("")
        print("")
        print("listening to Song...", end="")
        print("")
        time.sleep(4)
        self.clearScreen()
        return

    def add_to_playlist(self, sid):
        """ Adds to the playlist """
        # Ask for a playlist name
        playlistName = input("Enter Playlist Name: ")

        self.cur.execute("""
        SELECT p.pid
        FROM playlists p, users u
        WHERE p.title = :playlistName AND u.uid = :userId AND p.uid = u.uid;
        """,{'playlistName': playlistName, 'userId': self.uid})

        rows = self.cur.fetchall()
        # If user does not have playlist of given name
        # create a new playlist and then include the song into the playlist.
        if len(rows) == 0:
            print("Making a new Playlist: {}.".format(playlistName))
            time.sleep(4)
            pid = random.randint(1000000, 10000000)
            # PID generated has to be unique
            self.cur.execute("""
                    SELECT pid
                    FROM playlists p;
                """)
            rows = self.cur.fetchall()
            gatekeeper = None
            # While PID is not unique
            while not gatekeeper:
                gatekeeper = True
                for each in rows:
                    if (pid == each[0]):
                        pid = random.randint(1000000, 10000000)
                        gatekeeper = False

            self.cur.execute("""
            INSERT INTO playlists VALUES(:pid, :title, :uid);
            """, {'pid': pid, 'title': playlistName, 'uid': self.uid})

            self.cur.execute("""
            INSERT INTO plinclude VALUES(:pid, :sid, :sorder);
            """, {'pid': pid, 'sid': sid, 'sorder': 1})
        else:
            # grab the pid
            pid = rows[0][0]

            # If PID already exists
            # check if the song is already in the playlist
            self.cur.execute("""
            SELECT *
            FROM plinclude p
            WHERE p.sid = :sid AND p.pid = :pid;
            """, {'sid': sid, 'pid': pid})
            rows = self.cur.fetchall()
            if len(rows) != 0:
                self.errorMsg("Song is already in Playlist: \"{}\"".format(playlistName))
                return

            # grab the max sorder of playlists
            # then increment by 1 when adding a new song.
            self.cur.execute("""
            SELECT p1.sorder
            FROM playlists p, plinclude p1
            WHERE p.pid = p1.pid;
            """)
            rows = self.cur.fetchall()
            max = 0
            for row in rows:
                if row[0] > max:
                    max = row[0]
            
            sorder = max + 1

            # rows[0][0] is the existing pid
            self.cur.execute("""
            INSERT INTO plinclude VALUES(:pid, :sid, :sorder);
            """, {'pid': pid, 'sid': sid, 'sorder': sorder})
        self.conn.commit()
        return

    def performSongAction(self, id):
        # probably only need the id
        while True:
            self.clearScreen()
            print("1. Listen")
            print("2. See more Information")
            print("3. Add to Playlist")
            print("4. Do nothing")
            try:
                option = int(input("What would you like to do with the song?: "))
            except:
                self.errorMsg("Please give a valid input")
                continue

            if (option == 1):
                # start a session if there is no on going session.
                if (self.sessionStart != 0):
                    self.listen_song(id)
                else:
                    self.userStartSession()
                    self.listen_song(id)
            elif (option == 2):
                self.more_information(id)
            elif (option == 3):
                self.add_to_playlist(id)
            elif(option == 4):
                return
            else:
                self.errorMsg("Input not an Option")
        

    def userStartSession(self):
        ''' To start a session '''
        # creates a 7 digit random session number
        self.sessionNum = random.randint(1000000, 10000000)
        # If sno is not unique. Randomize again
        self.cur.execute("""
            SELECT sno
            FROM sessions s
            WHERE uid = ':uid'
        """, {'uid' : self.uid})
        rows = self.cur.fetchall()
        gatekeeper = None
        while not gatekeeper:
            gatekeeper = True
            for each in rows:
                if (self.sessionNum == each[0]):
                    self.sessionNum = random.randint(1000000, 10000000)
                    gatekeeper = False
        # Can have duplicate session numbers
        # Date format: YYYY-MM-DD
        self.sessionStart = date.today()
        self.cur.execute("""
        INSERT INTO sessions VALUES (':uid', :sno, ':start', 'NULL');
        """, {'uid': self.uid, 'sno': self.sessionNum, 'start': self.sessionStart})
        self.conn.commit()

        # Finally, let user know that the session is starting.
        print("Starting a new Session with sno: {}".format(self.sessionNum))
        MESSAGE_DELAY = 3
        time.sleep(MESSAGE_DELAY)
        return

    def userEndSession(self):
        ''' To end a session'''
        if (self.sessionStart != 0):
            self.warningMsg("Ending Session Started by: {}, at {} with sno {}".format(self.uid, self.sessionStart, self.sessionNum))
            sessionEnd = date.today()
            self.cur.execute("""
            UPDATE sessions SET end = ':end' WHERE uid = ':uid' AND sno = ':sno' AND start = ':start'; 
            """, {'end': sessionEnd, 'uid': self.uid, 'sno': self.sessionNum, 'start': self.sessionStart})
            self.conn.commit()
            self.sessionNum = 0
            self.sessionStart = 0
        return

    def userSearchSongsAndPlaylists(self):
        ''' To Search for a song or playlist'''
        self.clearScreen()
        keyword = input("Search: ")
        print("")
        self.cur.execute("""
            SELECT "Song" as type, s.title as title, s.sid as id, s.duration as duration
            FROM songs s
            WHERE lower(s.title) like :keyword
            UNION
            SELECT "Playlist" as type, p.title as title, p.pid as id, sum(s1.duration) as duration
            FROM playlists p, plinclude p1, songs s1
            WHERE lower(p.title) like :keyword and p.pid = p1.pid and p1.sid = s1.sid
            GROUP by p.title;
        """, {'keyword': '%'+keyword+'%'})

        rows = self.cur.fetchall()
        if (len(rows) == 0):
            self.errorMsg("No Search results")
        elif len(rows) > 5:
            rowOption = input("There are more than 5 matches. Would you like to view all of them? Y/N ")
            if (rowOption.lower() == "n"):
                # run query that only shows 5 of them
                count = 1

                for each in rows:
                    # printing song/playlist, id, title, total duration
                    print(str(count)+'.', each[0], each[2], each[1], each[3])
                    if count >= 5:
                        break
                    count += 1
                self.errorMsg("")
                self.userSelect(rows)
            else:
                count = 1
                for each in rows:
                    # printing song/playlist, id, title, total duration
                    print(str(count)+'.', each[0], each[2], each[1], each[3])
                    count += 1
                self.errorMsg("")
                self.userSelect(rows)
        else:
            count = 1
            for each in rows:
                    # printing song/playlist, id, title, total duration
                    print(str(count)+'.', each[0], each[2], each[1], each[3])
                    count += 1
            self.errorMsg("")
            self.userSelect(rows)
        return

    def userSelect(self, rows):
        ''' To select a song or a playlist'''
        count = 1
        values = {}
        # hash table that keeps record of values and will have the form "table[count] = list['type', 'title', 'id', 'duration']" 
        for each in rows:
            values[str(count)] = [each[0], each[1], each[2], each[3]]
            count += 1

        selection = input("Would you like to select any of the values in the search? (Y/N) ")
        if (selection.lower() == "n"):
            self.errorMsg("Back to User Menu")
            return
        elif (selection.lower() == "y"):
            numSelection = input("Which number would you like to pick? (\"1\"): ")
            try:
                # Check if the value at the specified index exists
                values[numSelection]
            except:
                print("")
                self.errorMsg("Incorrect Input or Input out of Range")
                print("")
                self.userSelect(rows)
                return

            if (values[numSelection][0] == 'Playlist'):
                print("\nSelected Playlist: {} {} {}.".format(values[numSelection][2], values[numSelection][1], values[numSelection][3]))
                time.sleep(4)

            else:
                self.clearScreen()
                print("\nSelected Song: {} {} {}".format(values[numSelection][2], values[numSelection][1], values[numSelection][3]))
                time.sleep(4)
                self.performSongAction(values[numSelection][2])
        else:
            self.errorMsg("Incorrect option.")
            self.userSelect(rows)
        return

    ''' ===== Artist Functionality ===== '''

    def artistAddSong(self):
        """
        The menu function for when an artist account chooses "add song" in the artist menu.
        """
        self.clearScreen()
        exists = False
        while True:
            self.clearScreen()
            name = input('Please enter the name of the song (empty name is not allowed): ')
            if len(name) > 0:
                break
        while True:
            duration  = input('Please enter the duration of the song: ')
            if duration.isnumeric():
                break
            else :
                print("Please enter valid number.")

        db = """
                SELECT title, duration 
                FROM songs 
                """
        self.cur.execute(db)
        out = self.cur.fetchall()
        # the for loop check if the song is already exist.
        for i in out:
            if name == i[0] and int(duration) == i[1]:
                exists = True
                print('The song already exists.')
                # if the song does exist, users can chose if they want to add another song or leave
                again = input("Do you want to add another song? (y/n):")
                again = again.lower()
                if again == 'y':
                    self.artistAddSong()
                    return
                elif again == 'n':
                    print('Go back to previous page')
                    self.artistActionMenu()
                    return
                else:
                    print('Go back to previous page')
                    self.artistActionMenu()
                    return
        if not exists:
            # this part gets the sid before any calculation
            getid = """
                    SELECT max(sid)
                    FROM   songs
                    """
            self.cur.execute(getid)
            sid = self.cur.fetchone()
            sid = sid[0]+1
            #-----------------------------
            # this part of the code finds out all players who play the song and add them to the perform
            while True:
                otherplayer = input('any other player co-player? (y/n)')
                otherplayer = otherplayer.lower()
                perform = """
                            INSERT INTO perform VALUES('{}','{}');    
                            """
                if otherplayer == 'y':
                    userinput = input("please enter the players' name who played this song (please seperate by comma EX: A, B): ")
                    userinput = userinput.split(', ')
                    userinput = self.name2aid(userinput)
                    if userinput == 0:
                        print()
                        print("the player does not in our system")
                        input("press any key to go back to privious page: ")
                        self.artistActionMenu()
                    aid = self.uid
                    userinput.append(aid)
                    for i in userinput:
                        temp = perform.format(i,sid)
                        self.cur.execute(temp)
                    break;
                elif otherplayer == 'n':
                    temp = perform.format(self.uid, sid)
                    self.cur.execute(temp)
                    break
                else:
                    print('Please enter a valid input.')
            #----------------------------------------------
            query = """
                INSERT INTO songs VALUES(:Sid, :Title, :Duration);
                    """
            self.cur.execute(query,{'Sid' : sid, 'Title': name , 'Duration': duration})
            self.conn.commit()
            print('Song has been added to database!')
            self.afterAddSong()

    # the function maches the name of artist to their aid
    # the input is the co-singer's name 
    def name2aid(self, userinput):
        """
        Matches the name of an artist to their AID.
        userinput: The name (str) of the artist
        Returns: The AID (str) of the artist
        """
        query = """
                SELECT aid
                FROM artists
                WHERE artists.name = '{}'
                """
        arr = []
        if len(userinput) == 0:
            return 0
        for i in userinput:
            res = query.format(i)
            self.cur.execute(res)
            aid = self.cur.fetchall()
            if len(aid) == 0:
                return 0
            arr.append(aid[0][0])
        return arr
        


    def afterAddSong(self):
        """
        The menu function called after a song is successfully added to database.
        """
        #self.clearScreen()
        print('1) Add another song')
        print('2) Go back to previous page ')
        enter = input()
        if enter == '1':
            self.artistAddSong()
        elif enter == '2':
            self.artistActionMenu()
        else:
            print('Invalid input. Please enter "1" or "2".')
            self.afterAddSong()


    def artistFindTopFans(self):
        self.clearScreen()
        print('1) Find Top 3 Playlists')
        print('2) Find Top 3 Listeners')
        print('')
        print('3) Go Back')
        enter = input()
        if enter == '1':
            self.findTopPlaylist()
        elif enter == '2':
            self.findTopUsers()
        elif enter == '3':
            self.artistActionMenu()
        else:
            print('Invalid input. Please enter "1" or "2".')
            self.artistFindTopFans()
    
    def findTopUsers(self):
        self.clearScreen()
        query = """
                SELECT users.name 
                FROM users
                JOIN listen on users.uid = listen.uid
                JOIN songs on songs.sid = listen.sid
                JOIN perform on songs.sid = perform.sid
                JOIN artists on perform.aid = artists.aid
                WHERE artists.aid = "{}"
                GROUP BY users.uid, artists.aid
                ORDER BY SUM(listen.cnt *songs.duration) DESC
                LIMIT 3
                """
        query = query.format(self.uid)
        self.cur.execute(query)
        output = self.cur.fetchall()
        j=1
        for i in output:
            print("{}) {}".format(j,i[0]))
            j+=1
        back = input('When ready, type "y" to go back: ')
        back = back.lower()
        if back == 'y':
            self.artistFindTopFans()
        else:
            self.findTopUsers()
        self.conn.commit()
        

    def findTopPlaylist(self):
        self.clearScreen()
        query = """
                SELECT playlists.title
                FROM playlists
                JOIN plinclude on playlists.pid = plinclude.pid
                JOIN songs on songs.sid = plinclude.sid
                JOIN perform on plinclude.sid = perform.sid
                JOIN artists on perform.aid = artists.aid
                WHERE artists.aid = "{}"
                GROUP BY playlists.pid, artists.aid
                ORDER BY count(plinclude.sid) DESC
                LIMIT 3
                """
        query = query.format(self.uid)
        self.cur.execute(query)
        output = self.cur.fetchall()
        j =1
        for i in output:
            print("{}) {}".format(j,i[0]))
            j+=1
        back = input('When ready, type "y" to go back: ')
        back = back.lower()
        if back == 'y':
            self.artistFindTopFans()
        else:
            self.findTopPlaylist()
            print("")
        self.conn.commit()


''' ===== Main Application Section ===== '''


if __name__ == '__main__':
    if len(sys.argv) == 1:
        # No database was specified, so throw a warning
        print("")
        print("")
        print('ERROR: No database specified! Please include a database to open.')
        print('Syntax:   python main.py <database-file>')
        print("")
        print("")

    # argv[0] is just "main.py" (name of program)
    # argv[1] is the name of the database to be opened
    try:
        db_name = sys.argv[1]
    except:
        exit()

    app = Application(db_name)