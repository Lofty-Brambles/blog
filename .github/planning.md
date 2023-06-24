# 0.0.1 - Brainstorming 1

## This is how I want it-

- I want a partial CSR and partial MPA. Do some DOM diffing and create the SPA-transition feel for the landing page sections and the rest of the blog can be.. well, a blog.

- I want to use @11ty? I need a section to ISR my blog, publish it's post and I want the content to be hidden. Probably a template explicitly available.

- I want to use Nunjucks for html templating, SASS for css, Markdoc for posts and TS with svelte for the javascript. I want most items to be cached, so I don't know if I'll need CSR. Probanly will if I do comments. Do I want comments? Profanity filters and moderation will be a problem.

- How to achieve CSR? Diffing is easy but hijacking all possible opportunities for the user to mess up will need some thoughts.

- Read into 11ty.

# 0.0.1 - Brainstorming 2

- Dynamic content in a blog- do I want it to be something special? I want a special way of writing components too tbh, which includes the stuff mentioned above. A [rough picture of the component](./component.tm) may be as shown here. I will need an editor integration for the syntax niceties though.

- On second thoughts, maybe use Markdoc for html templating in the posts and an astro like boil down at build to make the components. I shouldn't need Nunjucks there, and it can use the component format mentioned above.
