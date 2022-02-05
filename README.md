# Web Log Console

This project is a simple console to view logs on browser.

A jar file is prepared in /build dir, so you can just download that file and run it.

!Please notice that console table, updates with delay because of performance issue

#### To run the app:

`java -jar WebLogConsole-1.0-SNAPSHOT.jar [--port=8081] [--noAutoLaunch]`

By default, a jetty server will run on port 8080, and the default browser will show up. you can change the port and
browser-auto-launch via command params.

#### To send Logs:

You have to send your log in json format to ``http://server-uri[localhost:8080]/broadcast``

via GET or POST method. One log each time and log structure must be:
``` json
{
    time:[log-time],
    type:[log-type: error,debug,...],
    tag:[log-tag: any string],
    log:[log-data: main data]
}
```
#### Sample PHP code:
```PHP
class Log
{
    private static $url = 'http://localhost:8080/broadcast';

    static function d($tag, $content)
    {
        self::sendLog("dev", $tag, $content);
    }

    static function e($tag, $content)
    {
        self::sendLog("error", $tag, $content);
    }

    static private function sendLog($type, $tag, $content)
    {
        $data = array(
            'time' => (new DateTime())->format('Y/m/d H:i:s:') . round(microtime(true) * 1000),
            'type' => $type,
            'tag' => $tag,
            'log' => $content,
        );
        $data = json_encode($data);
        $postData = http_build_query(
            array(
                'data' => $data
            )
        );
        $opts = array('http' =>
            array(
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
                'content' => $postData
            )
        );
        $context = stream_context_create($opts);
        file_get_contents(self::$url, false, $context);
    }
}

function test()
{
    for ($i = 0; $i < 10; $i++)
        Log::d("myTag1", "this is log " . $i);
        
    for ($i = 0; $i < 2; $i++)
        Log::d("myTag2", "this is log " . $i);
}
```


