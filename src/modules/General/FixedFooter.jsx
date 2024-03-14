import { Module } from '../../class/Module';
import { Shared } from '../../class/Shared';
import { DOM } from '../../class/DOM';
import { Settings } from '../../class/Settings';

class GeneralFixedFooter extends Module {
	constructor() {
		super();
		this.info = {
			description: () => (
				<ul>
					<li>
						Keeps the footer of any page at the bottom of the window while you scroll down the page.
					</li>
				</ul>
			),
			features: {
				ff_t: {
					description: () => (
						<fragment>
							<ul>
								<li>
									Removes upper portion to reduce the height of the footer.
								</li>
								<li>
									Add your own links with{' '}
									{Shared.common.getFeatureName(null, 'chfl')} , to enable now click{' '}
									<a
										className="table__column__secondary-link"
										href={`${Shared.esgst.settingsUrl}&id=chfl`}
										target="_blank"
									>
										here
									</a>
									.
								</li>
							</ul>
						</fragment>
					),
					name: 'Thin Footer.',
					sg: true,
					st: true,
				},
			},
			id: 'ff',
			name: 'Fixed Footer',
			sg: true,
			st: true,
			type: 'general',
		};
	}

	init() {
		if (!Shared.footer) {
			return;
		}

		Shared.footer.nodes.outer.classList.add('esgst-ff');
		if (Settings.get('ff_t')) {
			Shared.footer.nodes.outer.classList.add('esgst-thin');
		}
	}
}

const generalFixedFooter = new GeneralFixedFooter();

export { generalFixedFooter };
