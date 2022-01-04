# Saber Foundations Alt Template

> This project is meant to test the new tools for template creation. It's still
> early stages so there will be bugs

## Prerequisites

- Node JS @latest (Preferable)
- Yarn @latest (Required) (**yarn dependant features are used in this project**)

## Run Locally

**Clone the project**

```bash
  git clone https://github.com/bs-production/saber-alt-template.git project-name
```

**Go to the project directory**

```bash
  cd project-name
```

**Bootstrap project**

```bash
  yarn bootstrap
```

**Start the dev server**

```bash
  yarn dev
```

**Reset cache**

```bash
  yarn run clean
```

## Getting distributable files

```bash
  yarn build
```

This builds the files in the src directory and outputs all the necessary file needed by the cms.

## Folders and files

Having a structured approach to template developement is key to a great and maintainable template.

### Root folders

- `./lib`
  - These are libraries that are not yet published but can be reused by other projects
- `./dist`
  - Used by the dev server and hot reloading
- `./prod`
  - Files that are meant to be consumed by the CMS are in here
- `./src`
  - The bread and butter of the template.

### The `./src` folder

- `./src/globals`
  - Styles and HTML 'templates' that are used on all pages. These are guaranteed to be present regardless of the page or page type
- `./src/pages`
  - To minimize the download size of pages, pages are split into 4 distinct pages. Each page has their own set of style and structure guarantees
  - The current list of page types are
    - landing (index)
    - content
    - lists
    - confimation
    - free-estimate
- `./src/sections`
  - For ease of use pages are split internally into reusable and swappable sections. Each section has a high level function that it serves. For instance:
    - Hero -> To attract attention and promote the vistor's curiousity
    - Testimonials -> To instil trust into the vistor's
    - CTA -> to entice the vistor to perform an action (In this case, to get a free estimate)
- `./src/widgets`
  - Widgets are dynamic pieces inside of a page. They are not template specific and the purpose of this folder is to provide CSS variable for theming. This can also be used to create widget template that are unique to this template but should be use rarely
- `./src/components`
  - Like `./src/globals` components are used throughout the site, but they are not guaranteed to be used across all pages. Components need to be small and flexible to reduce size and increase usability
- `./src/tokens`
  - Tokens are static string and/or raw html snippets. They come from the cms (Most of the time) and declaring the as such should be sufficient for template development
- `./src/hybrids`
  - Hybrids are special type that are similar to two or more of the above folders. Each hybrid has a unique set of behavior that needs custom implementation locally.

## Notes on importing css and js resources

When importing assets always import from the perspective of the pages directory.
For example, when a section imports its stylesheet it should **NOT** be relative to the section (`./styles.css`). Instead import it as if the section is inside the pages direcory (`../sections/[section]/styles.css`)

This is a limitation of caused by `posthtml-extends`. Files are first created through file reads (ending up in side the page directory) then Parcel tries to read the dependancies (which now points to the `./src/pages` direcory).

## Notes on HTML templates/modules

To import/use a html template use the `<extends src="[path_to_template]">` tag. The path should be used from the perspective of the `./src` folder. For example, to use the page base template, the src attribute should be `./src/globals/page_base.html`

## Tech Stack

**Client:** ParcelJS, Tailwind CSS, Sass
