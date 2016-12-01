# Beginning Node.js

  1. Core Node.js
  2. Events and Streams	
  3. HTTP
  4. Express
  
  5. Persisting Data
  6. Simplifying Callbacks
  7. Testing
  8. Deployment and Scalability

# Core Node.js

## File-Based Module System

  ** CommonJS module specification **

  * Each file is its own module
  * Each file has access to the current module definition using the module variable
  * The export of the current module is determited by the module.exports variable
  * To import a module, to use the globally avaiable require function

## Important Globals

  * __dirname 
  * __filename
  * process.argv
  * process.nextTick(callback)
  * Buffer

## Core Modules

  * path
    - path.normalize(str)
    - path.join([str1], [str2], ...)
    - path.dirname()
    - path.basename()
    - path.extname()

  * fs
    - fs.writeFileSync(path, text)
    - fs.readFileSync(path)
    - fs.unlinkSync(path)

  * os
    - os.totalmem()
    - os.freemem()

## npm
  
  ```
  npm init
  npm install
  npm install <module_name> --save
  npm rm <module_name> --save
  npm ls
  ```

# Streams

  * Readable stream
    process.stdin

  * Writable stream
    process.stdout

  * Duplex stream
    socket

  * Transform stream
    encryption and compression streams

# HTTP

# Express

  # body-parser
  # cookie-parser
  # cookie-session
  # express-session (better)
  # compression
  # connect-timeout






























