mod firestore;

use color_eyre::eyre::Result;
use structopt::StructOpt;
use tokio::io::AsyncReadExt;

/// A service to share code
#[derive(Debug, StructOpt, PartialEq)]
struct Opt {
    /// The paste to create.
    ///
    /// If left unspecified, this reads from stdin.
    #[structopt(default_value = "-")]
    input: String,

    /// The paste to show
    ///
    /// If specified, it ignores the `input` argument and fetches and displays the paste with given ID.
    #[structopt(long = "paste", short)]
    paste_to_show: Option<String>,
}

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;

    let Opt {
        mut input,
        paste_to_show,
    } = Opt::from_args();

    if input != "-" && paste_to_show.is_some() {
        Opt::clap().print_help()?;
        println!();
        return Ok(());
    }

    if let Some(paste) = paste_to_show {
        show_paste(&paste).await?;
        return Ok(());
    }

    if input == "-" {
        input.clear();
        let mut stdin = tokio::io::stdin();
        stdin.read_to_string(&mut input).await?;
    }

    create_paste(input.trim()).await?;
    Ok(())
}

async fn show_paste(paste_id: &str) -> Result<()> {
    let paste = firestore::get(paste_id).await?;
    let content = paste.fields.content();
    println!("{}", content);
    Ok(())
}

async fn create_paste(content: &str) -> Result<()> {
    let paste = firestore::create(content).await?;
    let link = format!("https://pastify-app.web.app/show/{}", paste.id());
    // todo: copy link to clipboard
    println!("{}", link);
    Ok(())
}
