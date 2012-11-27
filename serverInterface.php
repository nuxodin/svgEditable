<?
class serverInterface_qgSvg{
    static function textToPath($v){
    	session_write_close();
        $md5 = md5($v);
        $cache = appPATH.'cache/tmp/qgSvg_text2pathCache_'.$md5.'.txt';
        if(!is_file($cache)){
            $v = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><!--qgStart-->'.$v.'<!--qgEnd--></svg>';
    		$tmpPath = appPATH.'cache/tmp/qgsvg_tmp.svg';
    		file_put_contents($tmpPath, $v);
            chmod($tmpPath,0777);
            $command = 'inkscape -z -T -f '.$tmpPath.' -l '.$tmpPath.' 2>&1';
            exec($command,$return,$ausgabe);
            $v = file_get_contents($tmpPath);
			$v = preg_replace('/[\s\S]*<!--qgStart-->/','',$v);
            $v = preg_replace('/<!--qgEnd-->[\s\S]*/','',$v);
            file_put_contents($cache,$v);
    		return $v;
        }
        return file_get_contents($cache);        
    }
	/* man weiss nicht wie gross das bild schlussendlich ist!!
	static function textToPng($v){
        $v = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" height="200" width="200">'.$v.'</svg>';        
        $md5 = md5($v);
        
		$imgPath = appPATH.'cache/tmp/qgSvg_faketext_'.$md5.'.png';
		$imgUrl = appURL.'cache/tmp/qgSvg_faketext_'.$md5.'.png';
		$tmpPath = appPATH.'cache/tmp/qgsvg_tmp.svg';
		file_put_contents($tmpPath, $v);
		exec('inkscape -z -f '.$tmpPath.' -e '.$imgPath.' 2>&1', $return, $test);
		return $imgUrl;
	}
	*/
}
?>