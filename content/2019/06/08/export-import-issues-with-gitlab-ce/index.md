---
title: "Export/import issues with GitLab CE"
date: 2019-06-08T16:04:16+01:00
draft: true
---

GitLab CE (the free/open source version of GitLab) has an import issues feature but doesn’t have an export issues feature (because, not enterprise, apparently).

So if you fork a project and want to transfer the issues also, you’re out of luck. Unless you use the API, that is.

So I [ducked around](https://duckduckgo.com) and found that a kind soul by the name of Joseph Heenan had created [a Perl script to export your GitLab issues in CSV format](https://gitlab.com/emobix/get-all-gitlab-issues-as-csv). __Spoiler:__ __do not run this as-is__ and import the resulting CSV into GitLab CE as you will get corrupted issues. Because apparently GitLab CE has its own, incompatible CSV format compared to GitLab EE (because, not enterprise, apparently). So keep reading…

## Perl like it’s 1999

Of course, since I’ve never gotten anything written in Perl ever to run first time in the last three decades of working with computers, I first had to fix the following error:

{{<highlight sh>}}
Can't locate Text/CSV_XS.pm in @INC
{{</highlight>}}

Which I did by installing the Text::CVS_XS module:

{{<highlight sh>}}
/usr/bin/perl -MCPAN -e'install Text::CSV_XS'
{{</highlight>}}

This is a good point to grab a coffee while Perl installs half the known Internet onto your computer.

## I say CE, you say EE

Now, if you [update the script](https://gitlab.com/emobix/get-all-gitlab-issues-as-csv/blob/master/get-all-project-issues.pl#L12) with your GitLab installation, repository, and access information and run it, it should work but __you cannot import this export into your GitLab CE instance__. When I did, I ended up with a bunch of issues that the URL of the issue on the original project for the title and the body. Because apparently GitLab CE’s import CSV format isn’t compatible with GitLab EE’s export format. So, instead, I had to hack the script to leave just the two fields documented in the GitLab CE import CSV alert box (title and description). Honestly, this is all I wanted anyway.

## Finally

Here’s the updated script that should work. It creates exports a CSV file from your GitLab CE instance called _issues.csv_ in the current directory that you can import back into GitLab CE to get the titles and bodies of issues transferred to your fork.

{{<highlight perl>}}
#!/usr/bin/perl -w

use strict;

use LWP::UserAgent;
use Text::CSV_XS qw( csv );
use JSON::PP qw(decode_json);
# Uncomment these for debugging
# use LWP::ConsoleLogger::Easy qw( debug_ua );
# use Data::Dumper;

my $PROJECT_ID="<project-id>"; # numeric project id, can be found in project -> general settings
my $GITLAB_API_PRIVATE_TOKEN='<your-token>'; # obtained from https://gitlab.com/profile/personal_access_tokens
my $baseurl = "<your-gitlab-domain>"; # or https://gitlab.com if using Gitlab.com

$baseurl .= "api/v4/";
my $issuesurl = $baseurl."projects/".$PROJECT_ID."/issues";

my @issues = ();
my $page = 1;
my $totalpages;

do
{
  my %query_hash = (
      'per_page' => 100,
      'page' => $page
  );

  print "Fetching page $page".(defined($totalpages)?" (of $totalpages)":"")."\n";

  my $ua = LWP::UserAgent->new();
  $ua->default_header('PRIVATE-TOKEN' => $GITLAB_API_PRIVATE_TOKEN);

  my $uri = URI->new($issuesurl);
  $uri->query_form(%query_hash);
  my $resp = $ua->get($uri);
  if (!$resp->is_success) {
      die $resp->status_line;
  }
  $totalpages = int($resp->header("X-Total-Pages"));

  my $resptext;
  $resptext = $resp->decoded_content;

  my $issuedata = decode_json($resptext);

  push(@issues, @{$issuedata});
}
while ($page++ < $totalpages);

my $outputfname = "issues.csv";
my $csv = Text::CSV_XS->new ({ binary => 1, eol => $/ });
open my $fh, ">", $outputfname or die "$outputfname: $!";

my @headings = [
  "Title",
  "Description",
];
$csv->print ($fh, @headings) or $csv->error_diag;

foreach my $i (@issues)
{
  my @values = [
      $i->{'title'},
      $i->{'description'},
  ];
  $csv->print ($fh, @values) or $csv->error_diag;
}

close $fh or die "$outputfname: $!";

print "Issues saved to $outputfname\n";
{{</highlight>}}
