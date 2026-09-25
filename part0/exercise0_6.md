```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: {<br/>#nbsp;#nbsp;"content": "single page app does not reload the whole page",<br/>#nbsp;#nbsp;"date": "2019-05-25T15:15:59.905Z"<br/>}
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: The page is not reloaded, no further requests are made
```
