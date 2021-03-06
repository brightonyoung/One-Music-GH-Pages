<?php

require('../class-imagify.php');

$imagify = new Imagify\Optimizer( '5dc8d843e936c73eb679212a398b237e1ffaf409' );

$handle = $imagify->optimize( 'bear.jpg', array('keep_exif' => true) );

if ( true === $handle->success ) {
	
	$image_data = file_get_contents( $handle->image );

	file_put_contents( 'bear_optimized.jpg', $image_data );

	echo '<h1>Image optimized!</h1>';

} else {

	echo '<h1>' . $handle->message . '</h1>';

}