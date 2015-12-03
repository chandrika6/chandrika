<?php global $config, $loader, $registry; ?>
<?php echo $header; ?>
<?php echo $loader->controller('common/top_promo'); ?>
<?php
    $loader->model('custom/general');
$model_breadcrumbs = $registry->get('model_custom_general');
$breadcrumbs = $model_breadcrumbs->getBreadcrumbs($breadcrumbs);
echo $breadcrumbs;
?>

<div class="container content blog-page">
    <?php echo $content_top; ?>
        <div class="row">
        <?php echo $column_left; ?>
        <?php if ($column_left && $column_right) { ?>
        <?php $class = 'col-sm-6'; ?>
        <?php } elseif ($column_left || $column_right) { ?>
        <?php $class = 'col-sm-8 col-md-8 col-lg-9'; ?>
        <?php } else { ?>
        <?php $class = 'col-sm-12'; ?>
        <?php } ?>

        <div id="content" class="<?php echo $class; ?> blog-left">

        <div class="blog-post">
            <div class="post-container">
                <?php if(isset($article_info_found)) { ?>

                        <?php if($image) { ?>
                        <?php if(isset($featured_found)) { ?>
                        <img class="img-responsive animate scale" src="<?php echo $image; ?>" alt="<?php echo $article_info['article_title']; ?>" />
                        <?php } else { ?>
                        <img class="img-responsive animate scale" src="<?php echo $image; ?>" alt="<?php echo $article_info['article_title']; ?>" />
                        <?php } ?>
                        <?php } ?>

                        <div class="divider-sm"></div>

                    <div class="post_description">
                        <div class="title">
                            <h2>
                                <?php echo $article_info['article_title']; ?><br>
                                        <span class="sub-header">
                                            <?php echo $article_date_modified; ?>,
                                            <a href="<?php echo $author_url; ?>"><?php echo $article_info['author_name']; ?></a>,
                                            <?php if($article_info['allow_comment']) { ?>
                                            <?php echo $total_comment; ?>
                                            <?php } ?>

                                        </span>
                            </h2>
                        </div>
                        <?php if(isset($featured_found)) { ?>
                        <div class="article-description">
                            <?php echo html_entity_decode($article_info['description'], ENT_QUOTES, 'UTF-8'); ?>
                        </div>
                        <?php } else { ?>
                        <div class="article-description">
                            <?php echo html_entity_decode($article_info['description'], ENT_QUOTES, 'UTF-8'); ?>
                        </div>
                        <?php } ?>
                    </div>

                <!--additional info-->
                <?php if($article_additional_description) { ?>
                <?php foreach($article_additional_description as $description) { ?>
                <div class="article-description">
                    <?php echo html_entity_decode($description['additional_description'], ENT_QUOTES, 'UTF-8'); ?>
                </div>
                <?php } ?>
                <?php } ?>

                <?php if($products) { ?>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php echo $text_related_product; ?></h3>
                    </div>
                    <div class="panel-body">
                        <div class="row product-layout">
                            <?php foreach($products as $product) { ?>
                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div class="product-thumb transition simple-blog-product">

                                    <?php if ($product['thumb']) { ?>
                                    <div class="image"><a href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="img-responsive" /></a></div>
                                    <?php } ?>

                                    <div class="caption text-center">
                                        <h4><a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a></h4>
                                    </div>
                                </div>
                            </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
                <?php } ?>

                <?php if(($simple_blog_related_articles) && ($related_articles)) { ?>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php echo $text_related_article; ?></h3>
                    </div>

                    <div class="panel-body">
                        <div class="related-article">
                            <div class="row form-group">
                                <?php foreach($related_articles as $related_article) { ?>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="form-group">
                                        <div class="name text-center">
                                            <a href="<?php echo $related_article['article_href']; ?>"><?php echo $related_article['article_title']; ?></a>
                                        </div>

                                        <div class="related-article-meta">
                                            <?php echo $text_posted_by; ?> <a href="<?php echo $related_article['author_href']; ?>"><?php echo $related_article['author_name']; ?></a> | <?php echo $text_on; ?> <?php echo $related_article['date_added']; ?> | <?php echo $text_updated; ?> <?php echo $related_article['date_modified']; ?> |
                                        </div>

                                        <div class="image text-center">
                                            <a href="<?php echo $related_article['article_href']; ?>">
                                                <img src="<?php echo $related_article['image']; ?>" alt="<?php echo $related_article['article_title']; ?>" title="<?php echo $related_article['article_title']; ?>" class="img-responsive img-thumbnail" />
                                            </a>
                                        </div>

                                        <div>
                                            <?php if($column_left || $column_right) { ?>
                                            <?php echo utf8_substr(strip_tags(html_entity_decode($related_article['description'], ENT_QUOTES, 'UTF-8')), 0, 100) . '...'; ?>
                                            <?php } else { ?>
                                            <?php echo utf8_substr(strip_tags(html_entity_decode($related_article['description'], ENT_QUOTES, 'UTF-8')), 0, 350) . '...'; ?>
                                            <?php } ?>
                                        </div>

                                        <div class="related-article-button">
                                            <a href="<?php echo $url; ?>" class="btn btn-success"><?php echo $button_continue_reading; ?></a>
                                        </div>

                                        <div class="related-article-footer">
                                            <?php echo $related_article['total_comment']; ?><?php echo $text_comment_on_article; ?> <a href="<?php echo $related_article['article_href']; ?>#comment-section"><?php echo $text_view_comment; ?></a>
                                        </div>

                                    </div>
                                </div>
                                <?php } ?>
                            </div>
                        </div>

                    </div>

                </div>
                <?php } ?>


                <?php if($simple_blog_author_information) { ?>
                <?php if(isset($author_image)) { ?>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title"><?php echo $author_name . " " . $text_author_information; ?></h3>
                    </div>

                    <div class="panel-body">
                        <div class="author-info">
                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                <img src="<?php echo $author_image; ?>" alt="<?php echo $article_info['article_title']; ?>" style="border: 1px solid #cccccc; padding: 5px; border-radius: 5px;" />
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-9 col-xs-12">
                                <?php echo $author_description; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php } ?>
                <?php } ?>


                <?php if((isset($simple_blog_share_social_site)) && ($simple_blog_share_social_site)) { ?>
    								<span class="article-share" style="float: right;">

    									<span class="addthis_default_style"><a class="addthis_button_facebook"></a> <a class="addthis_button_twitter"></a> <a class="addthis_button_google_plusone_share"></a> <a class="addthis_button_linkedin"></a> <a class="addthis_button_pinterest_share"></a></span>
              							<script type="text/javascript" src="//s7.addthis.com/js/250/addthis_widget.js"></script>


    									<!-- ShareThis Button BEGIN -->
    									<!-- <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
    									<script type="text/javascript">stLight.options({publisher: "ur-d825282d-618f-598d-fca6-d67ef9e76731", doNotHash: true, doNotCopy: true, hashAddressBar: false});</script>
    									<span class='st_facebook' displayText=''></span>
    									<span class='st_twitter' displayText=''></span>
    									<span class='st_linkedin' displayText=''></span>
    									<span class='st_googleplus' displayText=''></span>
    									<span class='st_pinterest' displayText=''></span> -->
    									<!-- ShareThis Button END -->
    								</span>
                <?php } ?>

                <!--end additional info-->

                <?php } else { ?>
                <h3 class="text-center"><?php echo $text_no_found; ?></h3>
                <?php } ?>
            </div>

        </div>


        <div class="article-info">


            <?php if($article_info['allow_comment']) { ?>
            <div class="wrapper">
                <h3 class="pull-left title"><?php echo $text_related_comment; ?></h3>
            </div>
            <div class="clearfix"></div>


            <div class="comments form-group">
                <div id="comments" class="blog-comment-info">
                    <div id="comment-list"></div>
                    <div id="comment-section"></div>
                    <div class="divider divider-sm"></div>
                    <div class="line-divider"></div>
                    <div class="divider divider-lg"></div>

                    <h3 id="review-title">
                        <?php echo $text_write_comment; ?>
                        <i class="fa fa-times-circle fa-lg" id="reply-remove" style="display:none; cursor: pointer;" onclick="removeCommentId();"></i>
                    </h3>
                    <input type="hidden" name="blog_article_reply_id" value="0" id="blog-reply-id"/>

                    <div class="comment-left comment-form row">
                        <div class="col-md-6">
                            <div class="form-group"> <span class="icon icon-user"></span>
                                <input type="text" name="name" class="form-control" value="<?php echo $entry_name; ?>" onblur="if (this.value == '') {this.value = '<?php echo $entry_name; ?>';}" onfocus="if(this.value == '<?php echo $entry_name; ?>') {this.value = '';}">
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <span class="icon icon-bubbles-2"></span>
                                <textarea name="text" rows="5" class="form-control" onblur="if (this.value == '') {this.value = '<?php echo $entry_review; ?>';}" onfocus="if(this.value == '<?php echo $entry_review; ?>') {this.value = '';}"><?php echo $entry_review; ?></textarea>
                                <span style="font-size: 11px;"><?php echo $text_note; ?></span>
                            </div>
                        </div>
                    </div>
                    <div class="divider divider-sm"></div>

                    <?php if ($site_key) : ?>

                    <script type="text/javascript" src="https://www.google.com/recaptcha/api.js"></script>
                    <div class="form-group">
                        <div class="col-sm-12">
                            <div class="g-recaptcha" data-sitekey="<?php echo $site_key; ?>"></div>
                        </div>
                    </div>
                    <?php endif; ?>
                    <div class="divider divider-sm"></div>

                    <a id="button-comment" class="btn btn-cool"><span class="icon flaticon-new78"></span><?php echo $button_submit; ?></a>
                    <div class="divider divider-lg"></div>

                </div>
            </div>

            <?php } ?>

        </div>



        <?php echo $content_bottom; ?>
        </div>

        <?php echo $column_right; ?>

        </div>
    </div>
    
    <script type="text/javascript">
		function removeCommentId() {
			$("#blog-reply-id").val(0);
			$("#reply-remove").css('display', 'none');
		}
	</script>
    
    <script type="text/javascript">
		$('#comment-list .pagination a').delegate('click', function() {
			$('#comment-list').fadeOut('slow');
				
			$('#comment-list').load(this.href);
			
			$('#comment-list').fadeIn('slow');
			
			return false;
		});			
		
		$('#comment-list').load('index.php?route=simple_blog/article/comment&simple_blog_article_id=<?php echo $simple_blog_article_id; ?>');
		
	</script>	
    
    <script type="text/javascript">		
			$('#button-comment').bind('click', function() {
				$.ajax({
					type: 'POST',
					url: 'index.php?route=simple_blog/article/writeComment&simple_blog_article_id=<?php echo $simple_blog_article_id; ?>',
					dataType: 'json',
					data: 'name=' + encodeURIComponent($('input[name=\'name\']').val()) + '&text=' + encodeURIComponent($('textarea[name=\'text\']').val()) + '&reply_id=' + encodeURIComponent($('input[name=\'blog_article_reply_id\']').val()),
					beforeSend: function() {
						$('.success, .warning').remove();
						$('#button-comment').attr('disabled', true);
						//$('#review-title').after('<div class="attention"><img src="catalog/view/theme/default/image/loading.gif" alt="" /> <?php echo $text_wait; ?></div>');

                        /*
                        $('#notification').html('<div class="preloader"><div class="success_ev" style="display: none;"><?php echo $text_wait; ?></div></div>');
                        $('.success_ev').fadeIn('slow');

                        setTimeout(function(){
                            jQuery('.success_ev').fadeOut();
                        },1500)
                        */


                    },
					complete: function() {
						$('#button-comment').attr('disabled', false);
						$('.attention').remove();
					},
					success: function(data) {
					   
                        $('.alert').remove();
                        
						if (data['error']) {
							$('#review-title').after('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + data['error'] + '</div>');
						}
						
						if (data['success']) {
							$('#review-title').after('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + data['success'] + '</div>');
											
							$('input[name=\'name\']').val('');
							$('textarea[name=\'text\']').val('');
							$("#blog-reply-id").val(0);
							$("#reply-remove").css('display', 'none');
							
							$('#comment-list').load('index.php?route=simple_blog/article/comment&simple_blog_article_id=<?php echo $simple_blog_article_id; ?>');							
						}
					}
				});
			});
		</script> 	
		
    
<?php echo $footer; ?>